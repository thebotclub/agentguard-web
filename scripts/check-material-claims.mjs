import { existsSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_SNAPSHOT = "governance/claim-registry.snapshot.json";
const DEFAULT_SURFACES = "governance/claim-surfaces.json";

function writeFinding(finding) {
  process.stderr.write(`${JSON.stringify(finding)}\n`);
}

function parseArgs(argv) {
  let expectMissingPath = null;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--expect-missing") {
      const candidate = argv[index + 1];
      if (!candidate || candidate.startsWith("--")) {
        throw new Error("--expect-missing requires a path");
      }
      expectMissingPath = candidate;
      index += 1;
      continue;
    }
    throw new Error(`Unsupported argument: ${arg}`);
  }

  return { expectMissingPath };
}

function isExpectedMissing(observedPath, expectedPath) {
  return expectedPath !== null && resolve(observedPath) === resolve(expectedPath);
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

  const requiredInputs = [
    {
      code: "P1_WEB_SNAPSHOT_MISSING",
      path: DEFAULT_SNAPSHOT,
      message:
        "The generated claim-registry snapshot is required; missing truth cannot produce a green result.",
    },
    {
      code: "P1_WEB_SURFACES_MISSING",
      path: DEFAULT_SURFACES,
      message:
        "The web claim-surface manifest is required; missing inventory cannot produce a green result.",
    },
  ];

  for (const finding of requiredInputs) {
    if (!existsSync(resolve(finding.path))) {
      writeFinding(finding);
      return isExpectedMissing(finding.path, args.expectMissingPath) ? 0 : 1;
    }
  }

  if (args.expectMissingPath !== null) {
    writeFinding({
      code: "P1_WEB_EXPECTED_MISSING_NOT_OBSERVED",
      path: args.expectMissingPath,
      message: "The expected missing-input rejection was not observed.",
    });
    return 1;
  }

  writeFinding({
    code: "P1_WEB_CHECKER_UNIMPLEMENTED",
    path: DEFAULT_SNAPSHOT,
    message: "Material-claim validation is not implemented yet.",
  });
  return 1;
}

process.exitCode = run(process.argv.slice(2));
