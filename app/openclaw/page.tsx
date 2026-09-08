import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'OpenClaw compatibility',
  description:
    'The current AgentGuard package includes an OpenClaw compatibility hook. It is telemetry, not executor-owned firewall proof.',
};

export default function OpenClawPage() {
  return (
    <>
      <section className="section flush" style={{ paddingTop: 96 }}>
        <div className="container">
          <span className="eyebrow amber">OpenClaw · compatibility path</span>
          <h1 style={{ marginTop: 18, maxWidth: '20ch' }}>
            Policy telemetry for OpenClaw, with the boundary stated.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            AgentGuard&rsquo;s TypeScript package includes a structural
            before_tool_call HTTP hook. It can send
            observed events for policy evaluation and return a block result. The
            hook can be disabled or bypassed and owns no raw capability, so it is
            not firewall proof.
          </p>
          <div className="cta-row" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Discuss an OpenClaw evaluation
            </a>
            <a className="btn btn-secondary" href="https://github.com/thebotclub/agentguard-core/blob/main/SPEC.md#openclaw">
              Read the source spec →
            </a>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">Why this matters</span>
          <h2 style={{ marginTop: 14, maxWidth: '24ch' }}>
            A fleet you can&rsquo;t see is a fleet you can&rsquo;t defend.
          </h2>
          <div className="grid-3" style={{ marginTop: 36 }}>
            <div className="card">
              <div className="index">/01</div>
              <h3>Tool access is consequential</h3>
              <p>
                The malevolent &ldquo;Clawdbot&rdquo; investigation showed how easy it is for
                an autonomous agent to take consequential actions. Read the{' '}
                <a href="https://www.wired.com/story/malevolent-ai-agent-openclaw-clawdbot/" style={{ color: 'var(--teal)' }}>
                  Wired investigation
                </a>.
              </p>
            </div>
            <div className="card">
              <div className="index">/02</div>
              <h3>Detection is not mediation</h3>
              <p>
                FleetDM&rsquo;s research on{' '}
                <a href="https://fleetdm.com/articles/detecting-ai-agents-like-openclaw-with-automated-tooling" style={{ color: 'var(--teal)' }}>
                  detecting OpenClaw with automated tooling
                </a>{' '}
                describes ways to detect agent processes. Detection can inform an
                inventory, but it does not prove that a tool capability is held
                behind a separate executor identity.
              </p>
            </div>
            <div className="card">
              <div className="index">/03</div>
              <h3>The proof boundary</h3>
              <p>
                Firewall proof requires OpenClaw to see only a mediated MCP-stdio
                tool while a separately owned broker alone retains the raw
                capability. That topology is still being tested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plugin install */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow plain">Install</span>
              <h2 style={{ marginTop: 14 }}>A versioned compatibility hook.</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                The TypeScript package exposes a structural OpenClaw plugin that
                registers a before_tool_call hook and sends the observed proposal
                to the AgentGuard HTTP API.
              </p>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                Strict mode can return a block result when evaluation fails;
                permissive mode allows on error. Neither mode owns the underlying
                tool capability under a separate identity. See{' '}
                <a href="https://openclaw.ai" style={{ color: 'var(--teal)' }}>OpenClaw</a>{' '}
                for the runtime project itself.
              </p>
            </div>
            <div className="code-window">
              <div className="code-window-header">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span style={{ marginLeft: 8 }}>openclaw.json</span>
              </div>
              <pre>{`{
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
        "spec": "@the-bot-club/agentguard@0.11.2"
      }
    }
  }
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet view */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">Current visibility</span>
          <h2 style={{ marginTop: 14 }}>Compatibility events, not fleet proof.</h2>
          <p className="lede" style={{ marginTop: 14 }}>
            The hook can report observed tool-call proposals and policy results.
            This does not prove complete fleet coverage, non-bypassability,
            production use, or independent capability ownership.
          </p>
          <div className="placeholder-figure" style={{ marginTop: 28 }}>
            compatibility telemetry only · executor-owned broker proof pending
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '26ch', margin: '0 auto' }}>
            Evaluate the hook for what it is today.
          </h2>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Discuss an OpenClaw evaluation
            </a>
            <Link className="btn btn-secondary" href="/pricing">
              Read availability status
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
