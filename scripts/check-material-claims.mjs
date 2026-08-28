import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";

const DEFAULT_SNAPSHOT = "governance/claim-registry.snapshot.json";
const DEFAULT_SURFACES = "governance/claim-surfaces.json";

function writeFinding(finding) {
  process.stderr.write(`${JSON.stringify(finding)}\n`);
}

function parseArgs(argv) {
  let snapshotPath = DEFAULT_SNAPSHOT;
  let surfacesPath = DEFAULT_SURFACES;
  let expectMissingPath = null;
  let inventoryOnly = false;
  let paths = null;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--inventory-only") {
      inventoryOnly = true;
      continue;
    }
    if (["--snapshot", "--surfaces", "--paths", "--expect-missing"].includes(arg)) {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      if (arg === "--snapshot") snapshotPath = value;
      if (arg === "--surfaces") surfacesPath = value;
      if (arg === "--expect-missing") expectMissingPath = value;
      if (arg === "--paths") {
        paths = new Set(value.split(",").map((path) => path.trim()).filter(Boolean));
        if (paths.size === 0) throw new Error("--paths requires at least one path");
      }
      index += 1;
      continue;
    }
    throw new Error(`Unsupported argument: ${arg}`);
  }

  return {
    snapshotPath,
    surfacesPath,
    expectMissingPath,
    inventoryOnly,
    paths,
  };
}

function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
    .join(",")}}`;
}

function digestCanonical(value) {
  return `sha256:${createHash("sha256").update(canonicalJson(value)).digest("hex")}`;
}

function isExpectedMissing(observedPath, expectedPath) {
  return expectedPath !== null && resolve(observedPath) === resolve(expectedPath);
}

function loadJson(path, findings, missingCode, displayPath = path) {
  if (!existsSync(path)) {
    findings.push({
      code: missingCode,
      path: displayPath,
      message: "Required standalone web claim-governance input is missing.",
    });
    return undefined;
  }
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    findings.push({
      code: "P1_WEB_JSON_INVALID",
      path,
      message: error instanceof Error ? error.message : String(error),
    });
    return undefined;
  }
}

function add(findings, code, surface, message) {
  findings.push({
    code,
    path: surface.path,
    locator: surface.locator,
    claimId: surface.claimId,
    message,
  });
}

function validateSnapshot(snapshot, surfaces, findings, now) {
  if (snapshot.schemaVersion !== "agentguard.claim-registry-snapshot/v1") {
    findings.push({
      code: "P1_WEB_SNAPSHOT_SCHEMA_INVALID",
      path: DEFAULT_SNAPSHOT,
      message: "Unsupported or missing claim snapshot schemaVersion.",
    });
  }
  if (!/^[a-f0-9]{40}$/u.test(snapshot.sourceCoreCommit ?? "")) {
    findings.push({
      code: "P1_WEB_SOURCE_CORE_COMMIT_INVALID",
      path: DEFAULT_SNAPSHOT,
      locator: "sourceCoreCommit",
      message: "sourceCoreCommit must be one exact 40-character Git SHA.",
    });
  }
  if (!/^sha256:[a-f0-9]{64}$/u.test(snapshot.registryDigest ?? "")) {
    findings.push({
      code: "P1_WEB_REGISTRY_DIGEST_INVALID",
      path: DEFAULT_SNAPSHOT,
      locator: "registryDigest",
      message: "registryDigest must be a canonical SHA-256 digest.",
    });
  }
  if (!Number.isFinite(Date.parse(snapshot.generatedAt ?? ""))) {
    findings.push({
      code: "P1_WEB_GENERATED_AT_INVALID",
      path: DEFAULT_SNAPSHOT,
      locator: "generatedAt",
      message: "generatedAt must be an RFC3339 timestamp.",
    });
  }
  if (!Array.isArray(snapshot.claims) || snapshot.claims.length === 0) {
    findings.push({
      code: "P1_WEB_PUBLIC_SUBSET_EMPTY",
      path: DEFAULT_SNAPSHOT,
      locator: "claims",
      message: "Snapshot must contain the public claim subset.",
    });
    return new Map();
  }
  const observedClaimsDigest = digestCanonical(snapshot.claims);
  if (snapshot.claimsDigest !== observedClaimsDigest) {
    findings.push({
      code: "P1_WEB_CLAIMS_DIGEST_MISMATCH",
      path: DEFAULT_SNAPSHOT,
      locator: "claimsDigest",
      message: `Expected ${snapshot.claimsDigest}, observed ${observedClaimsDigest}.`,
    });
  }
  if (snapshot.sourceCoreCommit !== surfaces.sourceCoreCommit) {
    findings.push({
      code: "P1_WEB_SOURCE_CORE_COMMIT_MISMATCH",
      path: DEFAULT_SURFACES,
      locator: "sourceCoreCommit",
      message: "Surface manifest and snapshot bind different core commits.",
    });
  }
  if (snapshot.registryDigest !== surfaces.registryDigest) {
    findings.push({
      code: "P1_WEB_REGISTRY_DIGEST_MISMATCH",
      path: DEFAULT_SURFACES,
      locator: "registryDigest",
      message: "Surface manifest and snapshot bind different registry digests.",
    });
  }

  const claims = new Map();
  for (const claim of snapshot.claims) {
    if (!claim.id || claims.has(claim.id)) {
      findings.push({
        code: "P1_WEB_CLAIM_ID_INVALID",
        path: DEFAULT_SNAPSHOT,
        locator: claim.id ?? "claims",
        claimId: claim.id,
        message: "Public claim IDs must be present and unique.",
      });
      continue;
    }
    claims.set(claim.id, claim);
    if (!claim.owner?.trim()) {
      findings.push({
        code: "P1_WEB_CLAIM_OWNER_MISSING",
        path: DEFAULT_SNAPSHOT,
        locator: claim.id,
        claimId: claim.id,
        message: "Every public claim requires an owner.",
      });
    }
    const reviewedAt = Date.parse(claim.reviewedAt ?? "");
    const expiresAt = Date.parse(claim.expiresAt ?? "");
    if (!Number.isFinite(reviewedAt) || !Number.isFinite(expiresAt) || reviewedAt >= expiresAt) {
      findings.push({
        code: "P1_WEB_CLAIM_DATE_INVALID",
        path: DEFAULT_SNAPSHOT,
        locator: claim.id,
        claimId: claim.id,
        message: "Claim review and expiry timestamps are invalid.",
      });
    }
    if (Number.isFinite(expiresAt) && expiresAt <= now) {
      findings.push({
        code: "P1_WEB_CLAIM_EXPIRED",
        path: DEFAULT_SNAPSHOT,
        locator: claim.id,
        claimId: claim.id,
        message: `Public claim expired at ${claim.expiresAt}.`,
      });
    }
    if (!claim.appliesTo?.artifact || ![claim.appliesTo.version, claim.appliesTo.route, claim.appliesTo.assuranceTier].some(Boolean)) {
      findings.push({
        code: "P1_WEB_CLAIM_SCOPE_MISSING",
        path: DEFAULT_SNAPSHOT,
        locator: claim.id,
        claimId: claim.id,
        message: "Public claim is missing artifact/version/route/tier scope.",
      });
    }
    if (claim.state === "verified" && (!Array.isArray(claim.evidence) || claim.evidence.length === 0)) {
      findings.push({
        code: "P1_WEB_VERIFIED_EVIDENCE_MISSING",
        path: DEFAULT_SNAPSHOT,
        locator: claim.id,
        claimId: claim.id,
        message: "Verified public claims require evidence.",
      });
    }
    if (claim.state === "qualified" && (!claim.qualification?.trim() || !claim.limitations?.length)) {
      findings.push({
        code: "P1_WEB_QUALIFICATION_MISSING",
        path: DEFAULT_SNAPSHOT,
        locator: claim.id,
        claimId: claim.id,
        message: "Qualified public claims require qualification and limitations.",
      });
    }
    if (claim.state === "withdrawn" && (!claim.withdrawal || claim.surfaceIds?.length)) {
      findings.push({
        code: "P1_WEB_WITHDRAWAL_INVALID",
        path: DEFAULT_SNAPSHOT,
        locator: claim.id,
        claimId: claim.id,
        message: "Withdrawn public claims require a tombstone and no public surface.",
      });
    }
  }
  return claims;
}

function validateSurfaces(snapshot, manifest, claims, selectedPaths, findings) {
  if (manifest.schemaVersion !== "agentguard.web-claim-surfaces/v1") {
    findings.push({
      code: "P1_WEB_SURFACES_SCHEMA_INVALID",
      path: DEFAULT_SURFACES,
      message: "Unsupported or missing web surface schemaVersion.",
    });
  }
  if (!Array.isArray(manifest.surfaces) || manifest.surfaces.length === 0) {
    findings.push({
      code: "P1_WEB_SURFACES_EMPTY",
      path: DEFAULT_SURFACES,
      message: "Web surface manifest must enumerate exact public locators.",
    });
    return [];
  }
  const surfaces = manifest.surfaces.filter(
    ({ path }) => selectedPaths === null || selectedPaths.has(path),
  );
  if (selectedPaths) {
    const knownPaths = new Set(manifest.surfaces.map(({ path }) => path));
    for (const path of selectedPaths) {
      if (!knownPaths.has(path)) {
        findings.push({
          code: "P1_WEB_PATH_UNREGISTERED",
          path,
          message: "Requested path is not present in the exact web surface inventory.",
        });
      }
    }
  }

  const ids = new Set();
  for (const surface of surfaces) {
    if (!surface.id || ids.has(surface.id)) {
      add(findings, "P1_WEB_SURFACE_ID_INVALID", surface, "Surface IDs must be present and unique.");
    }
    ids.add(surface.id);
    if (!surface.locator?.trim()) {
      add(findings, "P1_WEB_LOCATOR_MISSING", surface, "Every public surface requires an exact locator.");
    }
    const claim = claims.get(surface.claimId);
    if (!claim) {
      add(findings, "P1_WEB_UNKNOWN_CLAIM", surface, "Surface references an unknown snapshot claim ID.");
    } else if (!claim.surfaceIds?.includes(surface.id)) {
      add(findings, "P1_WEB_CLAIM_SURFACE_LINK_MISSING", surface, "Snapshot claim does not bind this exact surface ID.");
    }
    const path = resolve(surface.path);
    if (!existsSync(path)) {
      add(findings, "P1_WEB_SURFACE_PATH_MISSING", surface, "Registered web surface path does not exist.");
      continue;
    }
    if (surface.digest) {
      const observed = `sha256:${createHash("sha256").update(readFileSync(path)).digest("hex")}`;
      if (observed !== surface.digest) {
        add(findings, "P1_WEB_SURFACE_DIGEST_MISMATCH", surface, `Expected ${surface.digest}, observed ${observed}.`);
      }
    }
  }
  return surfaces;
}

function validateLiveSurfaces(surfaces, findings) {
  for (const surface of surfaces) {
    const path = resolve(surface.path);
    if (!existsSync(path) || ["pdf", "image"].includes(surface.kind)) continue;
    const text = readFileSync(path, "utf8");
    for (const pattern of surface.prohibitedPatterns ?? []) {
      if (text.toLocaleLowerCase().includes(pattern.toLocaleLowerCase())) {
        add(
          findings,
          "P1_WEB_QUALIFIED_SURFACE_CONTRADICTION",
          surface,
          `Registered prohibited content remains live: ${pattern}`,
        );
      }
    }
  }
}

function run(argv) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (error) {
    writeFinding({
      code: "P1_WEB_USAGE_ERROR",
      path: "<argv>",
      message: error instanceof Error ? error.message : String(error),
    });
    return 2;
  }

  const snapshotPath = isAbsolute(args.snapshotPath)
    ? args.snapshotPath
    : resolve(args.snapshotPath);
  const surfacesPath = isAbsolute(args.surfacesPath)
    ? args.surfacesPath
    : resolve(args.surfacesPath);
  const findings = [];
  const snapshot = loadJson(
    snapshotPath,
    findings,
    "P1_WEB_SNAPSHOT_MISSING",
    args.snapshotPath,
  );
  const manifest = loadJson(
    surfacesPath,
    findings,
    "P1_WEB_SURFACES_MISSING",
    args.surfacesPath,
  );
  if (findings.length > 0) {
    for (const finding of findings) writeFinding(finding);
    const observedMissing = findings.find(({ code }) => code.endsWith("_MISSING"));
    return observedMissing && isExpectedMissing(observedMissing.path, args.expectMissingPath)
      ? 0
      : 1;
  }
  if (args.expectMissingPath !== null) {
    writeFinding({
      code: "P1_WEB_EXPECTED_MISSING_NOT_OBSERVED",
      path: args.expectMissingPath,
      message: "The expected missing-input rejection was not observed.",
    });
    return 1;
  }

  const claims = validateSnapshot(snapshot, manifest, findings, Date.now());
  const selectedSurfaces = validateSurfaces(
    snapshot,
    manifest,
    claims,
    args.paths,
    findings,
  );
  if (!args.inventoryOnly) validateLiveSurfaces(selectedSurfaces, findings);
  for (const finding of findings) writeFinding(finding);
  process.stdout.write(
    `${JSON.stringify({
      mode: args.inventoryOnly ? "inventory-only" : "live",
      liveEvaluated: !args.inventoryOnly,
      sourceCoreCommit: snapshot.sourceCoreCommit,
      registryDigest: snapshot.registryDigest,
      generatedAt: snapshot.generatedAt,
      claimCount: claims.size,
      surfaceCount: selectedSurfaces.length,
      findingCount: findings.length,
    })}\n`,
  );
  return findings.length === 0 ? 0 : 1;
}

process.exitCode = run(process.argv.slice(2));
