import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(TEST_DIR, "..");
const CHECKER_PATH = resolve(WEB_ROOT, "scripts/check-material-claims.mjs");
const SNAPSHOT_PATH = resolve(
  WEB_ROOT,
  "governance/claim-registry.snapshot.json",
);
const SURFACES_PATH = resolve(WEB_ROOT, "governance/claim-surfaces.json");

function run(cwd, ...args) {
  try {
    const stdout = execFileSync(process.execPath, [CHECKER_PATH, ...args], {
      cwd,
      encoding: "utf8",
      env: { ...process.env, FORCE_COLOR: "0" },
    });
    return { stdout, stderr: "", exitCode: 0 };
  } catch (error) {
    return {
      stdout: error.stdout || "",
      stderr: error.stderr || "",
      exitCode: error.status ?? 1,
    };
  }
}

function makeTempRoot(t) {
  const root = mkdtempSync(join(tmpdir(), "agentguard-web-claims-"));
  mkdirSync(join(root, "governance"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return root;
}

function readFindings(result) {
  assert.notEqual(result.exitCode, 0, "mutated governance must be non-green");
  return result.stderr
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function mutateGovernance(t, mutateSnapshot, mutateSurfaces = (value) => value) {
  const root = makeTempRoot(t);
  const snapshot = mutateSnapshot(
    JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8")),
  );
  const surfaces = mutateSurfaces(
    JSON.parse(readFileSync(SURFACES_PATH, "utf8")),
  );
  const snapshotPath = join(root, "governance/snapshot.json");
  const surfacesPath = join(root, "governance/surfaces.json");
  writeFileSync(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  writeFileSync(surfacesPath, `${JSON.stringify(surfaces, null, 2)}\n`);
  return run(
    WEB_ROOT,
    "--snapshot",
    snapshotPath,
    "--surfaces",
    surfacesPath,
    "--inventory-only",
  );
}

describe("standalone material-claim gate", () => {
  it("rejects a missing claim-registry snapshot with a stable code", (t) => {
    const root = makeTempRoot(t);
    const findings = readFindings(run(root));
    assert.equal(findings[0].code, "P1_WEB_SNAPSHOT_MISSING");
    assert.equal(
      findings[0].path,
      "governance/claim-registry.snapshot.json",
    );
  });

  it("rejects a missing claim-surface manifest with a distinct stable code", (t) => {
    const root = makeTempRoot(t);
    writeFileSync(
      join(root, "governance/claim-registry.snapshot.json"),
      "{}\n",
      "utf8",
    );
    const findings = readFindings(run(root));
    assert.equal(findings[0].code, "P1_WEB_SURFACES_MISSING");
    assert.equal(findings[0].path, "governance/claim-surfaces.json");
  });

  it("validates the checked-in snapshot without a sibling repository", () => {
    const result = run(WEB_ROOT, "--inventory-only");
    assert.equal(result.exitCode, 0, result.stderr);
    const summary = JSON.parse(result.stdout.trim());
    assert.equal(summary.mode, "inventory-only");
    assert.equal(summary.liveEvaluated, false);
    assert.match(summary.sourceCoreCommit, /^[a-f0-9]{40}$/);
    assert.match(summary.registryDigest, /^sha256:[a-f0-9]{64}$/);
  });

  it("rejects an unknown claim ID", (t) => {
    const result = mutateGovernance(
      t,
      (value) => value,
      (value) => {
        value.surfaces[0].claimId = "unknown.claim";
        return value;
      },
    );
    assert.ok(
      readFindings(result).some(({ code }) => code === "P1_WEB_UNKNOWN_CLAIM"),
    );
  });

  it("rejects a stale registry digest", (t) => {
    const result = mutateGovernance(t, (value) => {
      value.registryDigest = `sha256:${"0".repeat(64)}`;
      return value;
    });
    assert.ok(
      readFindings(result).some(
        ({ code }) => code === "P1_WEB_REGISTRY_DIGEST_MISMATCH",
      ),
    );
  });

  it("rejects an expired public claim", (t) => {
    const result = mutateGovernance(t, (value) => {
      value.claims[0].expiresAt = "2020-01-01T00:00:00Z";
      return value;
    });
    assert.ok(
      readFindings(result).some(({ code }) => code === "P1_WEB_CLAIM_EXPIRED"),
    );
  });

  it("rejects a missing exact locator", (t) => {
    const result = mutateGovernance(
      t,
      (value) => value,
      (value) => {
        value.surfaces[0].locator = "";
        return value;
      },
    );
    assert.ok(
      readFindings(result).some(
        ({ code }) => code === "P1_WEB_LOCATOR_MISSING",
      ),
    );
  });

  it("rejects altered snapshot content", (t) => {
    const result = mutateGovernance(t, (value) => {
      value.claims[0].meaning = "tampered meaning";
      return value;
    });
    assert.ok(
      readFindings(result).some(
        ({ code }) => code === "P1_WEB_CLAIMS_DIGEST_MISMATCH",
      ),
    );
  });
});
