import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const CHECKER_PATH = resolve(TEST_DIR, "../scripts/check-material-claims.mjs");

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

function readFinding(result) {
  assert.notEqual(result.exitCode, 0, "missing governance must be non-green");
  return JSON.parse(result.stderr.trim());
}

describe("standalone material-claim gate", () => {
  it("rejects a missing claim-registry snapshot with a stable code", (t) => {
    const root = makeTempRoot(t);

    const finding = readFinding(run(root));

    assert.equal(finding.code, "P1_WEB_SNAPSHOT_MISSING");
    assert.equal(finding.path, "governance/claim-registry.snapshot.json");
  });

  it("rejects a missing claim-surface manifest with a distinct stable code", (t) => {
    const root = makeTempRoot(t);
    writeFileSync(
      join(root, "governance/claim-registry.snapshot.json"),
      "{}\n",
      "utf8",
    );

    const finding = readFinding(run(root));

    assert.equal(finding.code, "P1_WEB_SURFACES_MISSING");
    assert.equal(finding.path, "governance/claim-surfaces.json");
  });
});
