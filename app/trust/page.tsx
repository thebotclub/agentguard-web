import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trust and limitations',
  description:
    'AgentGuard assurance tiers, current compatibility scope, and the firewall proof that remains pending.',
};

export default function TrustPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <span className="eyebrow plain">Trust and limitations</span>
        <h1 style={{ marginTop: 14 }}>What AgentGuard proves today.</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          AgentGuard separates current compatibility telemetry from the stronger
          executor-owned broker proof it is designed to earn. A same-UID
          configured intercept exists for one named GitHub file write; see{' '}
          <a href="/proof">the named-action proof</a>. Capability isolation and
          firewall results are not claimed, and no GO decision has been recorded.
        </p>

        <div className="prose" style={{ marginTop: 48 }}>
          <h2>Firewall proof</h2>
          <p>
            This tier is eligible only when an executor-owned MCP-stdio broker
            alone holds the raw capability. OpenClaw must see only the mediated
            proxy tool, while the broker owns policy evaluation, one-use permits,
            dispatch, replay state, and durable decision and outcome evidence.
          </p>
          <p>
            This proof is pending. It requires current, dated evidence for the
            exact broker artifact, host topology, action, and bypass probes before
            AgentGuard can publish a scoped firewall-proof result. It would not
            prove that every possible process or path on a host was unable to act.
          </p>

          <h2>Compatibility</h2>
          <p>
            The current OpenClaw <code>before_tool_call</code> hook, TypeScript and
            Python in-process integrations, and MCP HTTP/in-process adapters are
            compatibility telemetry. They can evaluate policy and record a
            decision, but they do not own the raw capability and can be disabled
            or bypassed by a caller that retains another route.
          </p>
          <p>
            Current published packages are TypeScript{' '}
            <code>@the-bot-club/agentguard@0.12.0</code> and Python{' '}
            <code>agentguard-tech==0.12.0</code>. <code>strict: false</code>{' '}
            allow-on-error is a hard startup error. The OpenClaw hook and MCP
            adapters call <code>POST /api/v1/evaluate</code> on the AgentGuard API
            with <code>X-API-Key</code>; the API also accepts the 0.11.2{' '}
            <code>/v1/openclaw/intercept</code> and <code>/v1/mcp/intercept</code>{' '}
            envelopes so already-installed 0.11.2 adapters keep working. OpenClaw
            plugin metadata is <code>1.0.0</code>. These are compatibility
            artifacts, not executor-owned broker proof.
          </p>

          <h2>Boundary limits</h2>
          <ul>
            <li>
              <strong>Attacker and host.</strong> The intended proof covers an
              unprivileged OpenClaw identity with no raw credential, client, or
              alternate unmediated path. It does not cover a malicious
              administrator, physical compromise, or full-host compromise.
            </li>
            <li>
              <strong>Outcome.</strong> A receipt states only what the named broker
              dispatcher did or did not dispatch. It is not a universal claim
              that no other host path executed an action.
            </li>
            <li>
              <strong>Keys.</strong> The V1 contract requires broker-only OS
              custody, bounded file permissions, and key-bound verification.
              That custody is a later implementation requirement; hardware,
              tamper, admin, and physical protection are not claimed.
            </li>
          </ul>

          <h2>Failure and recovery</h2>
          <p>
            Missing, invalid, stale, revoked, timed-out, replayed, or unwritable
            policy and evidence states deny permit issuance and broker dispatch.
            In V1, <code>require_approval</code> records a blocked result and does
            not continue to dispatch. Missing or unknown outcome evidence cannot
            authorize an automatic retry.
          </p>
          <p>
            Normal recovery has no ordinary off mode. It uses a current verified
            last-known-good artifact or scoped emergency deny. Any exceptional
            bypass is expiring, dual-controlled, audited, limited to known
            low/medium read-only operations, and excluded from proof.
          </p>

          <h2>Contract sources</h2>
          <p>
            The V1 contracts for assurance tiers, key lifecycle, failure
            matrix, and rollback states are checked into the core
            repository; the{' '}
            <Link href="/docs/#policy">policy reference</Link> restates
            their default and fail-closed semantics. These contracts
            define intended V1 behavior; they do not by themselves
            establish that the broker topology is implemented or proven.
          </p>
        </div>
      </div>
    </section>
  );
}
