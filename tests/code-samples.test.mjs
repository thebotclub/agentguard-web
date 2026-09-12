/**
 * Guards the code samples this site publishes.
 *
 * Both defects below shipped because no gate ever executed or parsed a sample:
 *
 *  1. `/docs/` told Python callers to read `result["mcp_error_response"]` from
 *     `evaluate_mcp()`. `POST /api/v1/mcp/evaluate` returns camelCase
 *     (`mcpErrorResponse`), and the Python client's own docstring says so, so
 *     the published snippet raised `KeyError` on the blocked path — the exact
 *     path the snippet exists to demonstrate.
 *
 *  2. The homepage YAML sample (step 03) omitted `id`, `name` and `version`.
 *     `PolicyEngine.loadFromYaml` validates against `PolicyDocumentSchema`,
 *     which requires all three, so pasting the sample into the API the adjacent
 *     step-02 snippet advertises threw `Invalid policy schema`.
 *
 * These assertions are structural — they need no network and no installed SDK —
 * but they encode the two contracts that were broken.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_PAGE = readFileSync(resolve(WEB_ROOT, "app/docs/page.tsx"), "utf8");
const HOME_PAGE = readFileSync(resolve(WEB_ROOT, "app/page.tsx"), "utf8");
const OPENCLAW_PAGE = readFileSync(resolve(WEB_ROOT, "app/openclaw/page.tsx"), "utf8");

/** Keys the deployed API returns. snake_case variants are never correct. */
const API_RESPONSE_KEYS = [
  "mcpErrorResponse",
  "matchedRuleId",
  "riskScore",
  "durationMs",
  "sessionId",
];
const FORBIDDEN_SNAKE_CASE = [
  "mcp_error_response",
  "matched_rule_id",
  "risk_score",
  "duration_ms",
  "session_id",
];

describe("published code samples", () => {
  it("never tells callers to read a snake_case key off an API response", () => {
    const offenders = [];
    for (const [page, source] of [
      ["app/docs/page.tsx", DOCS_PAGE],
      ["app/page.tsx", HOME_PAGE],
      ["app/openclaw/page.tsx", OPENCLAW_PAGE],
    ]) {
      for (const key of FORBIDDEN_SNAKE_CASE) {
        if (source.includes(key)) offenders.push(`${page}: ${key}`);
      }
    }
    assert.deepEqual(offenders, []);
  });

  it("documents evaluate_mcp with the key the API actually returns", () => {
    assert.match(DOCS_PAGE, /evaluate_mcp/);
    assert.match(DOCS_PAGE, /result\["mcpErrorResponse"\]/);
  });

  it("keeps the camelCase key names the API returns", () => {
    for (const key of API_RESPONSE_KEYS.slice(0, 4)) {
      assert.ok(DOCS_PAGE.includes(key), `docs page never mentions ${key}`);
    }
  });

  /**
   * Extract every fenced/`<pre>` template literal that looks like a policy
   * document (it has a `rules:` key) and assert it carries the three fields
   * `PolicyDocumentSchema` marks required.
   */
  function policyDocuments(source) {
    const found = [];
    for (const match of source.matchAll(/\{`([^`]*\brules:\s*\n[^`]*)`\}/g)) {
      found.push(match[1]);
    }
    return found;
  }

  it("every YAML policy sample carries the fields loadFromYaml requires", () => {
    const samples = [
      ...policyDocuments(HOME_PAGE).map((s) => ["app/page.tsx", s]),
      ...policyDocuments(DOCS_PAGE).map((s) => ["app/docs/page.tsx", s]),
    ];
    assert.ok(samples.length > 0, "no YAML policy sample found to check");

    const offenders = [];
    for (const [page, sample] of samples) {
      // Rule-fragment lists (`- tool: { in: [...] }`) are not documents.
      if (!/^\s*rules:/m.test(sample)) continue;
      for (const field of ["id:", "name:", "version:"]) {
        // Top-level keys only — a rule's own `id:` is indented.
        if (!new RegExp(`^${field}`, "m").test(sample)) {
          offenders.push(`${page}: policy sample is missing top-level \`${field}\``);
        }
      }
    }
    assert.deepEqual(offenders, []);
  });

  /**
   * The published OpenClaw plugin has no fail-open branch: `register()` throws
   * `HOOK_SAFE_FAIL_OPEN_FORBIDDEN` when `config.strict === false`. Copy that
   * says a permissive mode exists describes software that was never shipped.
   */
  it("does not claim a permissive / fail-open OpenClaw mode", () => {
    const offenders = [];
    for (const [page, source] of [
      ["app/page.tsx", HOME_PAGE],
      ["app/openclaw/page.tsx", OPENCLAW_PAGE],
    ]) {
      if (/permissive mode/i.test(source)) offenders.push(`${page}: claims a permissive mode`);
      if (/allows on (evaluation )?error/i.test(source)) {
        offenders.push(`${page}: claims allow-on-error`);
      }
    }
    assert.deepEqual(offenders, []);
  });
});
