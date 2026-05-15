import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow">v0.1 · runtime governance for production AI agents</span>
          <h1 className="hero-title">
            Production AI agents
            <br />
            your regulator can sign off.
          </h1>
          <p className="hero-sub">
            Runtime governance for production AI agents. CPS 230 evidence on Day 1,
            EU AI Act and ISO 42001 mappings included. Built for APRA-regulated
            financial services in Australia and APAC.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://cal.com/hanikoshaji/cps230-review">
              Book a CPS 230 readiness review
            </a>
            <a className="btn btn-secondary" href="https://demo.agentguard.tech">
              Try the demo
            </a>
          </div>
          <div className="hero-meta">
            <div className="install-row">
              <span className="install"><span className="dollar">$</span> npm install @the-bot-club/agentguard</span>
              <span className="install"><span className="dollar">$</span> pip install agentguard-tech</span>
            </div>
            <div className="chip-row" style={{ justifyContent: 'center', maxWidth: 760 }}>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginRight: 6, alignSelf: 'center' }}>
                Governs:
              </span>
              {[
                'openclaw',
                'langchain',
                'crewai',
                'openai-assistants',
                'autogen',
                'langgraph',
                'mcp',
                'vercel-ai',
                'express / fastapi',
              ].map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why AgentGuard */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow plain">Why AgentGuard</span>
            <h2 style={{ marginTop: 14 }}>The governance layer your CISO already asked you to build.</h2>
            <p className="lede" style={{ marginTop: 14 }}>
              Three things every APRA-regulated team needs the day they put a non-trivial AI agent into production.
            </p>
          </div>
          <div className="grid-3">
            <div className="card">
              <div className="index">/01</div>
              <h3>Built for APRA CPS 230 + EU AI Act</h3>
              <p>
                Controls mapped directly to CPS 230 operational risk, EU AI Act
                high-risk obligations, and ISO 42001. Every event in the log
                carries the framework reference. Your auditor opens one PDF and
                stops asking questions.
              </p>
            </div>
            <div className="card">
              <div className="index">/02</div>
              <h3>Runtime enforcement, not prompt-scanning</h3>
              <p>
                AgentGuard sits in the agent runtime &mdash; it intercepts tool
                calls, model outputs, and dollar-spend before they happen. Policies
                are YAML, not regex on prompts. Block actions, require human
                approval, or escalate to a second agent.
              </p>
            </div>
            <div className="card">
              <div className="index">/03</div>
              <h3>Audit evidence your board accepts</h3>
              <p>
                Every decision your agents make produces a signed,
                Bitcoin-anchored audit record. The compliance pack assembles them
                into a single PDF with framework mappings, control owners and
                statistical sampling &mdash; the format your Big-Four auditor expects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow plain">How it works</span>
            <h2 style={{ marginTop: 14 }}>Four steps from <code className="mono">pip install</code> to audit-ready.</h2>
          </div>
          <div className="grid-4">
            <div className="card">
              <div className="index">step 01</div>
              <h3>Install</h3>
              <p>One line in Python or Node. Works locally and behind your firewall &mdash; no SaaS dependency for runtime.</p>
              <pre className="code-block" style={{ marginTop: 14 }}>pip install agentguard-tech</pre>
            </div>
            <div className="card">
              <div className="index">step 02</div>
              <h3>Wire your agent</h3>
              <p>One decorator or middleware per framework. We ship adapters for OpenClaw, LangChain, CrewAI, AutoGen, OpenAI Assistants, and MCP.</p>
              <pre className="code-block" style={{ marginTop: 14 }}>{`from agentguard import guard

@guard(policy="cps230")
def run_agent(...): ...`}</pre>
            </div>
            <div className="card">
              <div className="index">step 03</div>
              <h3>Author policy YAML</h3>
              <p>Declarative policies covering tool whitelists, dollar caps, PII egress, human-in-the-loop gates, and after-hours rules.</p>
              <pre className="code-block" style={{ marginTop: 14 }}>{`limits:
  daily_spend_aud: 500
  tools_allow:
    - search
    - read_file
require_approval:
  - send_email`}</pre>
            </div>
            <div className="card">
              <div className="index">step 04</div>
              <h3>Generate evidence</h3>
              <p>One command builds the signed compliance pack &mdash; the same PDF format APRA-regulated boards already accept.</p>
              <pre className="code-block" style={{ marginTop: 14 }}>agentguard evidence build --framework cps230</pre>
            </div>
          </div>
        </div>
      </section>

      {/* OpenClaw section */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow amber">OpenClaw · the fleet problem</span>
              <h2 style={{ marginTop: 14 }}>Govern OpenClaw fleets natively.</h2>
              <p className="lede" style={{ marginTop: 14 }}>
                OpenClaw is the most popular open agent framework in the world.
                Most of them run unmonitored. AgentGuard is the only commercial
                governance product that natively manages OpenClaw &mdash; written by
                an operator who runs an 18-agent OpenClaw fleet in production.
              </p>
              <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 18, paddingLeft: 18 }}>
                <li>Drop-in plugin &mdash; no fork, no patches.</li>
                <li>Per-claw policy: dollar caps, tool whitelists, human approvals.</li>
                <li>Fleet view: which claws are live, what they're doing, what they cost.</li>
                <li>Killswitch and rollback on policy breach.</li>
              </ul>
              <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
                <Link href="/openclaw" className="btn btn-secondary btn-sm">Read more →</Link>
                <a className="btn btn-ghost btn-sm" href="https://openclaw.ai">openclaw.ai</a>
              </div>
            </div>
            <div className="code-window">
              <div className="code-window-header">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span style={{ marginLeft: 8 }}>~/fleet/openclaw.config.yaml</span>
              </div>
              <pre>{`# Drop into your existing OpenClaw config
plugins:
  - name: agentguard
    package: "@the-bot-club/agentguard"
    options:
      policy: ./policies/cps230.yaml
      evidence: ./evidence/
      anchor: true        # Bitcoin-anchor audit roots
      fleet_id: bnb-prod  # tag for fleet view
      tools:
        allow: [search, read_file, http_get]
        require_approval: [send_email, transfer]
      limits:
        daily_spend_aud: 500
        max_parallel_claws: 12`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Tribunal pair */}
      <section className="section">
        <div className="container">
          <div className="pair-card">
            <span className="eyebrow plain">The Tribunal pair</span>
            <h2 style={{ marginTop: 14, maxWidth: '24ch' }}>
              One event spec. One policy DSL. One audit log.
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              AgentGuard governs your <strong style={{ color: 'var(--text)' }}>production agents</strong>.
              {' '}Tribunal governs your <strong style={{ color: 'var(--text)' }}>coding agents</strong>. Together
              they're one spec across every agent your company runs &mdash; from the
              CrewAI worker handling claims, to the Claude Code session shipping
              the patch that powers it.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a className="btn btn-secondary btn-sm" href="https://tribunal.dev">
                tribunal.dev →
              </a>
              <Link className="btn btn-ghost btn-sm" href="/compliance">
                How the evidence joins up →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing snapshot */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="eyebrow plain">Pricing</span>
              <h2 style={{ marginTop: 14 }}>Free to start. Flat-fee to ship compliant.</h2>
            </div>
            <Link href="/pricing" className="btn btn-ghost btn-sm">See full comparison →</Link>
          </div>
          <div className="price-grid">
            <div className="price-card">
              <h3>Free</h3>
              <div className="amount">$0 <small>/ forever</small></div>
              <ul>
                <li>1 agent, 7-day retention</li>
                <li>Local audit log</li>
                <li>Community Discord</li>
                <li>MIT-licensed SDK</li>
              </ul>
            </div>
            <div className="price-card featured">
              <h3>Team</h3>
              <div className="amount">$499 <small>AUD / month</small></div>
              <ul>
                <li>Up to 25 agents</li>
                <li>90-day retention</li>
                <li>SSO (Google, Microsoft)</li>
                <li>Signed audit roots</li>
                <li>Email support</li>
              </ul>
            </div>
            <div className="price-card">
              <h3>Compliance</h3>
              <div className="amount">$2,500 <small>AUD / month flat</small></div>
              <ul>
                <li>Unlimited agents</li>
                <li>1-year retention + cold archive</li>
                <li>CPS 230 evidence pack</li>
                <li>EU AI Act + ISO 42001 mappings</li>
                <li>Bitcoin-anchored audit roots</li>
                <li>Quarterly readiness review</li>
              </ul>
            </div>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', marginTop: 20, fontFamily: 'var(--font-mono)' }}>
            Enterprise &mdash; on-prem, SLA, dedicated SE. <Link href="/pricing" style={{ color: 'var(--teal)' }}>Talk to us →</Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '24ch', margin: '0 auto' }}>
            Ship the agent. Pass the audit.
          </h2>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href="https://cal.com/hanikoshaji/cps230-review">
              Book a CPS 230 readiness review
            </a>
            <a className="btn btn-secondary" href="https://demo.agentguard.tech">
              Try the demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
