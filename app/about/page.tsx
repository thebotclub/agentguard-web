import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who builds AgentGuard, what is available today, and which local enforcement proof is still pending.',
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <span className="eyebrow plain">About</span>
        <h1 style={{ marginTop: 14 }}>Built with the limits visible.</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          AgentGuard is developing a private, last-mile policy boundary for
          consequential agent actions. The current packages expose local
          contracts and compatibility telemetry; the stronger broker topology
          is still being tested.
        </p>

        <div className="prose" style={{ marginTop: 48 }}>
          <h2>The Bot Club</h2>
          <p>
            AgentGuard is built by{' '}
            <strong>The Bot Club Pty Ltd</strong> — an Australian company
            (ABN 99 695 980 226) developing open source for agent policy
            evaluation, local contracts, and explicit assurance boundaries.
          </p>
          <p>
            The Bot Club ships{' '}
            <a href="https://tribunal.dev">Tribunal</a> for coding-agent
            governance, AgentGuard for local agent action-control research and
            compatibility paths, and{' '}
            <a href="https://evidencely.ai">Evidencely</a> for AI-powered
            accounting automation.
          </p>

          <h2>Why this exists</h2>
          <p>
            Agent actions become difficult to control when the calling process
            also retains the raw tool, credential, or socket. AgentGuard exists
            to test a narrower design: the agent sees a mediated tool while a
            separately owned local broker alone holds the raw capability.
          </p>
          <p>
            The project does not claim broad market coverage or an exclusive
            integration position. It is concentrating on one reproducible
            OpenClaw-to-MCP-stdio path before expanding the scope.
          </p>
          <p>
            On 1 May 2026,{' '}
            <a href="https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai">
              APRA wrote to industry
            </a>{' '}
            describing observed gaps in AI governance and risk management.
            That public letter is context for operators; it is not evidence that
            AgentGuard satisfies a standard or will produce a compliance outcome.
          </p>
          <p>
            The current reader is a technical founder or operator evaluating
            whether one private, local action boundary can be made deterministic,
            non-bypassable within its stated host limits, and independently
            reproducible.
          </p>

          <h2>Where we are</h2>
          <ul>
            <li>
              <strong>v0.11.0</strong> — historical metadata release. Compatibility
              adapters only; not executor-owned firewall proof.
            </li>
            <li>
              <strong>v0.11.2</strong> — historical. Fail-open{' '}
              <code>strict: false</code> is a hard startup error. Named GitHub
              file-write intercept is documented on the proof page as configured
              intercept, not isolation.
            </li>
            <li>
              <strong>v0.11.3</strong> — historical. Adapters
              evaluate through <code>/api/v1/evaluate</code>; contracts
              entry point ships; telemetry opt-in.
            </li>
            <li>
              <strong>v0.12.0</strong> — historical. The{' '}
              <code>budgets</code> policy block is now enforced; it was accepted
              and ignored in every earlier release, so a policy that was
              silently over budget will start refusing actions. Rate-limit
              counters are storable across a restart and no longer leak, and{' '}
              <code>require_approval</code> is refused rather than passed
              through when no approval surface is configured.
            </li>
            <li>
              <strong>v0.13.0</strong> — historical. The{' '}
              <code>targets</code> policy block is now enforced; it was accepted
              and ignored in every earlier release, so a policy scoped to named
              agents applied to every agent. An agent a policy does not target
              is now refused rather than handed the policy default. A held
              action with no approval surface is refused with{' '}
              <code>403</code> instead of a <code>202</code> that invited the
              caller to poll a gate that would never resolve. Token and spend
              budgets gained a reporting path, so they enforce against usage the
              caller reports.
            </li>
            <li>
              <strong>v0.14.0</strong> — historical. <code>policyAppliesTo()</code>{' '}
              lets a caller ask whether a policy governs it before{' '}
              <code>targets</code> starts refusing; a block that matched nothing
              was previously indistinguishable from a policy that blocks
              everything. <code>riskScore</code> became one formula — the
              offline path had hard-coded the <code>medium</code> multiplier, so
              a <code>critical</code> session scored half what the same policy
              scored online.
            </li>
            <li>
              <strong>v0.15.0</strong> — current npm and PyPI. Rate-limit
              counters are namespaced by policy. They were keyed by rule id
              alone, so one engine holding two policies that both named a rule
              shared a single counter and one policy&apos;s traffic throttled
              the other&apos;s. <strong>Counters reset once on upgrade</strong>,
              and a rate-limit snapshot taken before this release no longer
              applies. The API service also stopped keeping its own copy of the
              evaluation algorithm, so budgets, targets and{' '}
              <code>riskScore</code> are enforced there on the same code path as
              everywhere else.
            </li>
            <li>
              Live SDKs on{' '}
              <a href="https://www.npmjs.com/package/@the-bot-club/agentguard">
                npm
              </a>{' '}
              and{' '}
              <a href="https://pypi.org/project/agentguard-tech/">PyPI</a>{' '}
              under{' '}
              <Link href="/docs/#source">
                BSL 1.1
              </Link>
              .
            </li>
            <li>
              Firewall-proof status: pending. The intended MCP-stdio broker must
              hold the raw capability outside OpenClaw and pass the registered
              bypass probes before a stronger claim is available.
            </li>
          </ul>

          <h2>Working with us</h2>
          <p>
            Current conversations are technical evaluations, not paid offers,
            service commitments, or readiness assessments. If you want to inspect
            the narrow action path and its limitations,{' '}
            <a href="https://calendly.com/hani-thebot/30min">
              book a 30-minute technical evaluation
            </a>
            . We&rsquo;ll start with the exact capability, caller identity, bypass
            paths, and evidence you can verify.
          </p>

          <h2>Who's writing this</h2>
          <p>
            <strong>Hani Koshaji</strong> — founder, The Bot Club, and maintainer
            of the AgentGuard project. Reach me at{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a> or on{' '}
            <a href="https://www.linkedin.com/in/hanikoshaji">LinkedIn</a>.
          </p>
        </div>

        <div
          style={{
            marginTop: 56,
            padding: '28px',
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            borderRadius: 14,
          }}
        >
          <h3 style={{ marginTop: 0 }}>The Bot Club Pty Ltd</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>
            ABN 99 695 980 226 · Sydney, Australia ·{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a>
          </p>
        </div>
      </div>
    </section>
  );
}
