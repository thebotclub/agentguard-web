import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'How to evaluate a policy offline or over HTTP, the YAML policy schema, the OpenClaw and MCP adapters, authentication, telemetry, the kill switch, and what is not proven yet.',
};

export default function DocsPage() {
  return (
    <section className="section flush" style={{ paddingTop: 96 }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <span className="eyebrow plain">Documentation</span>
        <h1 style={{ marginTop: 18 }}>Documentation.</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          How to call the policy engine offline or over HTTP, the YAML
          policy schema, the OpenClaw and MCP adapters, authentication,
          telemetry, the kill switch, and what is not proven yet. Every
          sample below is real code from{' '}
          <code>@the-bot-club/agentguard@0.11.3</code> and{' '}
          <code>agentguard-tech==0.11.3</code>; nothing here is
          aspirational.
        </p>

        <div className="toc" style={{ marginTop: 32, maxWidth: 440 }}>
          <div><span className="toc-num">01</span> <a href="#quickstart">Quickstart</a></div>
          <div><span className="toc-num">02</span> <a href="#policy">Policy YAML reference</a></div>
          <div><span className="toc-num">03</span> <a href="#openclaw">OpenClaw</a></div>
          <div><span className="toc-num">04</span> <a href="#mcp">MCP adapters</a></div>
          <div><span className="toc-num">05</span> <a href="#authentication">Authentication</a></div>
          <div><span className="toc-num">06</span> <a href="#telemetry">Telemetry</a></div>
          <div><span className="toc-num">07</span> <a href="#kill-switch">Kill switch</a></div>
          <div><span className="toc-num">08</span> <a href="#source">Source</a></div>
          <div><span className="toc-num">09</span> <a href="#support">Support</a></div>
          <div><span className="toc-num">10</span> <a href="#limitations">Limitations</a></div>
        </div>

        <div className="prose" style={{ marginTop: 8 }}>
          <h2 id="quickstart">Quickstart</h2>
          <p>
            Two paths to a decision: load a policy locally and evaluate it
            in-process with no network call and no API key, or send the
            proposed action to the hosted API. All three examples below
            return the same decision shape — <code>result</code>,{' '}
            <code>matchedRuleId</code>, <code>riskScore</code>,{' '}
            <code>reason</code>.
          </p>

          <h3>TypeScript — local policy, offline</h3>
          <p>
            <code>PolicyEngine</code>, exported from{' '}
            <code>@the-bot-club/agentguard</code>, loads a YAML policy
            document, validates it against the schema below, and
            evaluates actions in-process.
          </p>
          <p><strong>policies/agent-baseline.yaml</strong></p>
          <pre><code>{`id: agent-baseline
name: Agent baseline policy
version: 1.0.0
default: block
rules:
  - id: allow-reads
    action: allow
    priority: 10
    when:
      - tool:
          in: [read_file, search]
  - id: approve-email
    action: require_approval
    priority: 20
    when:
      - tool:
          in: [send_email]
    approvers: [ops-lead]
  - id: block-shell
    action: block
    priority: 5
    when:
      - tool:
          in: [shell_exec]`}</code></pre>
          <pre><code>{`import { randomUUID } from "node:crypto";
import { PolicyEngine } from "@the-bot-club/agentguard";

const engine = new PolicyEngine();
engine.loadFromFile("policies/agent-baseline.yaml");

const decision = engine.evaluate(
  {
    id: randomUUID(),
    agentId: "my-agent",
    tool: "read_file",
    params: { path: "/data/report.csv" },
    inputDataLabels: [],
    timestamp: new Date().toISOString(),
  },
  { agentId: "my-agent", sessionId: "session-1", policyVersion: "1.0.0" },
  "agent-baseline",
);
// decision.result === "allow"`}</code></pre>
          <p>
            <code>loadFromYaml(yamlString)</code> takes the same content as
            a string instead of a file path. An invalid document throws
            before any rule runs — see the policy reference below.
          </p>

          <h3>TypeScript — hosted API</h3>
          <p>
            <code>AgentGuard</code> sends the same proposal to the hosted
            policy API over HTTPS.
          </p>
          <pre><code>{`import { AgentGuard } from "@the-bot-club/agentguard";

const guard = new AgentGuard({ apiKey: process.env.AGENTGUARD_API_KEY });

const decision = await guard.evaluate({
  tool: "send_email",
  params: { to: "finance@example.com" },
});
// decision: { result, matchedRuleId?, riskScore, reason, durationMs }`}</code></pre>

          <h3>Python — hosted API</h3>
          <p>The Python client makes the same call.</p>
          <pre><code>{`from agentguard import AgentGuard

guard = AgentGuard(api_key="ag_live_...")

decision = guard.evaluate(tool="send_email", params={"to": "finance@example.com"})
# decision is the API's JSON response, unchanged: result, matchedRuleId,
# riskScore, reason, durationMs`}</code></pre>
          <p>
            Both HTTP clients call the same endpoint —{' '}
            <code>POST /api/v1/evaluate</code> — and return its response
            unmodified; see <a href="#authentication">Authentication</a>{' '}
            for the header both clients send.
          </p>

          <h2 id="policy">Policy YAML reference</h2>
          <p>
            A policy document is validated against{' '}
            <code>PolicyDocumentSchema</code> before it compiles. Top-level
            fields:
          </p>
          <ul>
            <li><code>id</code>, <code>name</code> — strings.</li>
            <li><code>version</code> — semver, e.g. <code>1.0.0</code>.</li>
            <li>
              <code>default</code> — <code>allow</code> | <code>block</code>{' '}
              | <code>monitor</code>, applied when no rule matches.
            </li>
            <li><code>rules</code> — up to 500 rules, evaluated as below.</li>
            <li>
              <code>targets</code>, <code>budgets</code> — optional agent
              scoping and spend/usage limits.
            </li>
          </ul>
          <p>Each rule:</p>
          <ul>
            <li>
              <code>id</code>, <code>priority</code> (1–1000, lower runs
              first, default 100).
            </li>
            <li>
              <code>action</code> — <code>allow</code> | <code>block</code>{' '}
              | <code>monitor</code> | <code>require_approval</code>.
            </li>
            <li>
              <code>when</code> — one or more conditions; a rule matches
              only if all of them do.
            </li>
            <li>
              <code>severity</code>, <code>tags</code>,{' '}
              <code>riskBoost</code> — feed the risk score.
            </li>
            <li>
              <code>rateLimit</code>, <code>approvers</code>,{' '}
              <code>timeoutSec</code>, <code>on_timeout</code>,{' '}
              <code>slackChannel</code> — used by rate-limited and{' '}
              <code>require_approval</code> rules.
            </li>
          </ul>
          <p><code>when</code> condition forms:</p>
          <pre><code>{`- tool: { in: [read_file, search] }
- tool: { not_in: [shell_exec] }
- tool: { matches: ["db:*"] }
- params: { amount: { gt: 1000 } }
- params: { to: { domain_not_in: ["example.com"] } }
- AND: [ { tool: { in: [send_email] } }, { params: { urgent: { eq: true } } } ]`}</code></pre>
          <p>
            <code>params</code>, <code>context</code>, and{' '}
            <code>dataClass</code> conditions take a field-to-constraint
            map (<code>eq</code>, <code>gt</code>, <code>gte</code>,{' '}
            <code>lt</code>, <code>lte</code>, <code>in</code>,{' '}
            <code>contains</code>, <code>regex</code>, <code>exists</code>,
            and more). <code>AND</code>, <code>OR</code>, and{' '}
            <code>NOT</code> nest any of the above; a{' '}
            <code>timeWindow</code> condition restricts a rule to a
            day/hour range.
          </p>
          <p>
            Monitor rules never stop evaluation — every matching monitor
            rule adds to <code>riskScore</code> and none of them can be
            the final decision. Among rules that do terminate evaluation
            (<code>allow</code>, <code>block</code>,{' '}
            <code>require_approval</code>), the first match by ascending{' '}
            <code>priority</code> wins; if two matches share a priority,
            the more restrictive one wins (<code>block</code> &gt;{' '}
            <code>require_approval</code> &gt; <code>allow</code>). When
            nothing matches, the policy&rsquo;s <code>default</code>{' '}
            applies — <code>block</code> is fail-closed, <code>allow</code>{' '}
            is fail-open, <code>monitor</code> flags the unknown tool
            without stopping it.
          </p>
          <p>
            <code>require_approval</code> is a valid rule action and{' '}
            <code>evaluate()</code> returns it, but V1 ships no approval
            dispatcher: a <code>require_approval</code> result blocks the
            call — the OpenClaw and MCP adapters below stop dispatch on it
            — and there is no path yet for a human to approve it back
            open.
          </p>

          <h2 id="openclaw">OpenClaw</h2>
          <p>
            The TypeScript package registers a structural{' '}
            <code>before_tool_call</code> hook, at priority 100, that
            sends the observed tool name and parameters to{' '}
            <code>POST /api/v1/evaluate</code> and can return a block
            result. Configure it in <code>openclaw.json</code>:
          </p>
          <pre><code>{`{
  "plugins": {
    "entries": {
      "agentguard": {
        "enabled": true,
        "config": {
          "apiKey": "\${AGENTGUARD_API_KEY}",
          "agentId": "my-agent",
          "strict": true
        }
      }
    },
    "installs": {
      "agentguard": {
        "source": "npm",
        "spec": "@the-bot-club/agentguard@0.11.3"
      }
    }
  }
}`}</code></pre>
          <p>
            <code>strict</code> must be <code>true</code>.{' '}
            <code>strict: false</code> (Python: <code>strict=False</code>)
            is a hard startup error — both the plugin and{' '}
            <code>openclaw_guard()</code> throw immediately, and there is
            no published fail-open branch. In strict mode, a block
            decision and an unreachable API both return{' '}
            <code>{'{ block: true, blockReason }'}</code>; anything else
            lets the call through unchanged.
          </p>
          <p>Python:</p>
          <pre><code>{`from agentguard.integrations.openclaw import openclaw_guard

guard = openclaw_guard(api_key="ag_live_...", agent_id="my-agent", strict=True)

decision = guard.intercept_sync("web_search", {"query": "recent AI papers"})
if not decision.allowed:
    raise PermissionError(decision.reason)`}</code></pre>
          <p>
            This is compatibility telemetry, not a firewall. The hook
            observes a tool call and asks the policy API for a decision;
            it does not hold the tool&rsquo;s raw capability under a
            separate identity. It can be turned off in{' '}
            <code>openclaw.json</code>, and a caller with any other route
            to the same tool bypasses it entirely. See{' '}
            <a href="#limitations">Limitations</a> and{' '}
            <Link href="/trust">Trust and limitations</Link>.
          </p>

          <h2 id="mcp">MCP adapters</h2>
          <p>
            The TypeScript package also ships an MCP HTTP proxy and an
            in-process server wrapper; <code>AgentGuard.evaluateMcp()</code>{' '}
            (TypeScript) and <code>evaluate_mcp()</code> (Python) call the
            same policy path directly for one <code>tools/call</code>{' '}
            request:
          </p>
          <pre><code>{`const result = await guard.evaluateMcp("write_file", {
  arguments: { path: "/etc/passwd", content: "..." },
});
if (result.blocked) {
  return result.mcpErrorResponse; // hand back to the MCP client
}
// otherwise forward the call to the upstream MCP tool server`}</code></pre>
          <pre><code>{`result = guard.evaluate_mcp(
    "write_file",
    arguments={"path": "/etc/passwd", "content": "..."},
)
if result["blocked"]:
    return result["mcp_error_response"]`}</code></pre>
          <p>
            Both the HTTP proxy and the in-process wrapper evaluate
            through <code>POST /api/v1/evaluate</code> and carry the same
            limits as the OpenClaw hook: <code>strict: false</code> is a
            hard startup error, and neither adapter holds the wrapped
            tool&rsquo;s capability under a separate identity — either can
            be disabled, and a caller with a direct route to the upstream
            MCP server bypasses both.
          </p>

          <h2 id="authentication">Authentication</h2>
          <p>
            Every hosted-API call — <code>evaluate</code>,{' '}
            <code>evaluateMcp</code>, the OpenClaw hook,{' '}
            <code>killSwitch</code>, and the rest of the client methods —
            authenticates with an <code>X-API-Key</code> header:
          </p>
          <pre><code>{`X-API-Key: ag_live_xxxxxxxxxxxxxxxxxxxx`}</code></pre>
          <p>Get a key:</p>
          <pre><code>{`POST https://api.agentguard.tech/api/v1/signup
Content-Type: application/json

{"name": "My Agent"}`}</code></pre>
          <p>
            Returns <code>201</code> with an <code>apiKey</code> starting{' '}
            <code>ag_live_</code>. It is shown once — store it yourself;{' '}
            <code>email</code> is optional. A missing or invalid key
            returns <code>401</code> with{' '}
            <code>{'{ error, message, acceptedAuth, docs }'}</code>. The
            evaluate endpoints additionally accept a narrower,
            agent-scoped <code>ag_agent_</code> key.
          </p>

          <h2 id="telemetry">Telemetry</h2>
          <p>
            Telemetry is opt-in and off by default in both SDKs. Pass{' '}
            <code>telemetry: true</code> (TypeScript) or{' '}
            <code>telemetry=True</code> (Python) to the client constructor
            to send one fire-and-forget ping on the first{' '}
            <code>evaluate()</code> call:
          </p>
          <pre><code>{`{
  "sdk_version": "0.11.3",
  "language": "node",
  "node_version": "v20.11.0",
  "os_platform": "linux"
}`}</code></pre>
          <p>
            The Python SDK sends the same four keys — including{' '}
            <code>node_version</code> for its own runtime string, e.g.{' '}
            <code>python/3.11.2</code>. No tool names, parameters, or
            policy content are ever sent. Set{' '}
            <code>AGENTGUARD_NO_TELEMETRY=1</code> to force telemetry off
            regardless of the <code>telemetry</code> option.
          </p>

          <h2 id="kill-switch">Kill switch</h2>
          <p>
            Toggle your tenant&rsquo;s kill switch with the same API key
            used for <code>evaluate</code>:
          </p>
          <pre><code>{`POST /api/v1/killswitch
X-API-Key: ag_live_...
Content-Type: application/json

{"active": true}`}</code></pre>
          <p>
            or from either client: <code>guard.killSwitch(true)</code> /{' '}
            <code>guard.kill_switch(True)</code>. While it is active,
            every <code>POST /api/v1/evaluate</code> call for that tenant
            returns a block decision with{' '}
            <code>killSwitchActive: true</code>:
          </p>
          <pre><code>{`{
  "result": "block",
  "matchedRuleId": "TENANT_KILL_SWITCH",
  "riskScore": 1000,
  "reason": "Tenant kill switch is ACTIVE — all your agent actions are blocked.",
  "durationMs": 0,
  "killSwitchActive": true
}`}</code></pre>
          <p>
            <code>GET /api/v1/killswitch</code> reports the current global
            and tenant state.
          </p>

          <h2 id="source">Source</h2>
          <p>
            Both packages are licensed under the Business Source License
            1.1 — not MIT, not Apache. Read the licence terms shipped in
            the package before relying on either commercially.
          </p>
          <p>
            The npm tarball ships compiled JavaScript, <code>.d.ts</code>{' '}
            type declarations, and source maps — no TypeScript source.
            The PyPI sdist ships the Python source directly; Python has no
            separate compiled-artifact step.
          </p>
          <p>
            The core repository is private while the project is pre-GA.
            Request access at{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a>.
          </p>

          <h2 id="support">Support</h2>
          <p>
            Questions, bug reports, or a technical evaluation:{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a>, or{' '}
            <a href="https://calendly.com/hani-thebot/30min">
              book 30 minutes directly
            </a>
            .
          </p>

          <h2 id="limitations">Limitations</h2>
          <p>
            Every adapter on this page — the OpenClaw hook, both MCP
            adapters, both HTTP clients — is compatibility telemetry: each
            can observe a proposed action and return a policy decision,
            but none holds the tool&rsquo;s raw capability under a
            separate identity, and each can be disabled or bypassed by a
            caller with another route to the same tool. Executor-owned
            firewall proof is still pending. Read{' '}
            <Link href="/trust">Trust and limitations</Link>,{' '}
            <Link href="/proof">the named-action proof</Link>, and{' '}
            <Link href="/compliance">assurance status</Link> before
            relying on any of this for something you cannot independently
            verify.
          </p>
        </div>
      </div>
    </section>
  );
}
