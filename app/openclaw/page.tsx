import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'OpenClaw fleet governance',
  description:
    'AgentGuard is the only commercial governance product that natively manages OpenClaw fleets — written by an operator who runs an 18-claw production fleet.',
};

export default function OpenClawPage() {
  return (
    <>
      <section className="section flush" style={{ paddingTop: 96 }}>
        <div className="container">
          <span className="eyebrow amber">OpenClaw · fleet governance</span>
          <h1 style={{ marginTop: 18, maxWidth: '20ch' }}>
            Govern OpenClaw fleets the way they were always supposed to be governed.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            OpenClaw is the most popular open agent framework in the world. Most of
            them run unmonitored &mdash; un-throttled spend, no tool whitelist, no
            audit trail. AgentGuard is the only commercial governance product that
            natively manages OpenClaw, and it ships from an operator who has been
            running an 18-claw production fleet since 2024.
          </p>
          <div className="cta-row" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
            <a className="btn btn-primary" href="https://cal.com/hanikoshaji/cps230-review">
              Book a fleet review
            </a>
            <a className="btn btn-secondary" href="https://docs.agentguard.tech/openclaw">
              Plugin docs →
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
              <h3>The Wired problem</h3>
              <p>
                The malevolent &ldquo;Clawdbot&rdquo; investigation showed how easy it is for
                an OpenClaw process to drift &mdash; impersonating users, exfiltrating
                data, racking up spend. Read the{' '}
                <a href="https://www.wired.com/story/malevolent-ai-agent-openclaw-clawdbot/" style={{ color: 'var(--teal)' }}>
                  Wired investigation
                </a>.
              </p>
            </div>
            <div className="card">
              <div className="index">/02</div>
              <h3>The FleetDM angle</h3>
              <p>
                FleetDM&rsquo;s research on{' '}
                <a href="https://fleetdm.com/articles/detecting-ai-agents-like-openclaw-with-automated-tooling" style={{ color: 'var(--teal)' }}>
                  detecting OpenClaw with automated tooling
                </a>{' '}
                tells you what your SOC is seeing today: unidentified Python
                processes making outbound LLM calls. AgentGuard turns those into
                first-class, governed citizens.
              </p>
            </div>
            <div className="card">
              <div className="index">/03</div>
              <h3>The operator angle</h3>
              <p>
                AgentGuard is written by someone running an 18-claw production
                fleet &mdash; not by a consultancy who read the README. Every control
                in the plugin exists because we needed it on a Tuesday afternoon
                at 3pm.
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
              <h2 style={{ marginTop: 14 }}>Drop-in plugin, no fork.</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                The AgentGuard plugin loads alongside your existing OpenClaw
                config. It registers a pre-tool-call hook, a post-tool-call hook,
                and a spend tracker. Your existing claws keep working &mdash; they
                just start producing governed events.
              </p>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                Compatible with OpenClaw{' '}
                <a href="https://openclaw.ai" style={{ color: 'var(--teal)' }}>v3.x and later</a>.
                Works locally, in Docker, and inside Kubernetes operator deployments.
              </p>
            </div>
            <div className="code-window">
              <div className="code-window-header">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span style={{ marginLeft: 8 }}>install.sh</span>
              </div>
              <pre>{`# Python claws
pip install agentguard-tech[openclaw]

# Node claws
npm install @the-bot-club/agentguard

# In your openclaw.config.yaml:
plugins:
  - name: agentguard
    options:
      policy: ./policies/cps230.yaml
      evidence: ./evidence/
      fleet_id: bnb-prod
      anchor: true

# Verify
$ openclaw plugins list
  ✓ agentguard@0.4.2  (policy: cps230)`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet view */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">Fleet view</span>
          <h2 style={{ marginTop: 14 }}>One screen for every claw you run.</h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Which claws are live, what they&rsquo;re doing, what they cost, and which
            ones have tripped a policy. Single-pane-of-glass for the team that
            owns the fleet, with audit-grade exports for the team that signs off
            on it.
          </p>
          <div className="placeholder-figure" style={{ marginTop: 28 }}>
            fleet view · screenshot placeholder
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '26ch', margin: '0 auto' }}>
            Stop guessing what your fleet is doing.
          </h2>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href="https://cal.com/hanikoshaji/cps230-review">
              Book a fleet review
            </a>
            <Link className="btn btn-secondary" href="/pricing">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
