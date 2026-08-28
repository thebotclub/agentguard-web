import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Local agent action control · proof in progress</span>
          <h1 className="hero-title">
            Put policy before
            <br />
            an agent action.
          </h1>
          <p className="hero-sub">
            AgentGuard is building a private, last-mile policy boundary for
            consequential agent actions. The current packages provide policy
            evaluation and compatibility telemetry; executor-owned firewall proof
            remains pending.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Discuss a technical evaluation
            </a>
            <Link className="btn btn-secondary" href="/playground">
              Inspect policy decisions
            </Link>
          </div>
          <div className="hero-meta">
            <div className="install-row">
              <span className="install"><span className="dollar">$</span> npm install @the-bot-club/agentguard</span>
              <span className="install"><span className="dollar">$</span> pip install agentguard-tech</span>
            </div>
            <div className="chip-row" style={{ justifyContent: 'center', maxWidth: 760 }}>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginRight: 6, alignSelf: 'center' }}>
                Current artifacts:
              </span>
              {[
                'typescript sdk',
                'python compatibility sdk',
                'openclaw hook',
                'mcp http adapter',
                'mcp in-process adapter',
                'local v1 contracts',
                'express api',
                'cli source',
                'self-hosting references',
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
            <h2 style={{ marginTop: 14 }}>A narrow control boundary, stated plainly.</h2>
            <p className="lede" style={{ marginTop: 14 }}>
              AgentGuard separates what exists today from the stronger proof the project is still working to earn.
            </p>
          </div>
          <div className="grid-3">
            <div className="card">
              <div className="index">/01</div>
              <h3>Local policy contracts</h3>
              <p>
                The TypeScript line contains strict v1 contracts for requests,
                decisions, permits, outcomes, and evidence. They are independently
                versioned from the Python compatibility package.
              </p>
            </div>
            <div className="card">
              <div className="index">/02</div>
              <h3>Compatibility is not a firewall</h3>
              <p>
                The shipped OpenClaw hook and MCP HTTP/in-process adapters can
                observe policy decisions and return a block result. They can also
                be disabled or bypassed, so they are telemetry, not capability
                separation.
              </p>
            </div>
            <div className="card">
              <div className="index">/03</div>
              <h3>Proof before stronger claims</h3>
              <p>
                The intended firewall boundary is an executor-owned local MCP-stdio
                broker that alone retains the raw capability. That topology is not
                yet shipped or proven, so no production, compliance, or fleet
                outcome is claimed here.
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
            <h2 style={{ marginTop: 14 }}>Four facts you can verify in the <code className="mono">source</code>.</h2>
          </div>
          <div className="grid-4">
            <div className="card">
              <div className="index">step 01</div>
              <h3>Choose a package</h3>
              <p>The TypeScript and Python packages have independent release lines and different assurance scope.</p>
              <pre className="code-block" style={{ marginTop: 14 }}>pip install agentguard-tech</pre>
            </div>
            <div className="card">
              <div className="index">step 02</div>
              <h3>Evaluate a proposal</h3>
              <p>The compatibility SDKs can send a proposed action to the policy API and return its decision.</p>
              <pre className="code-block" style={{ marginTop: 14 }}>{`from agentguard import guard

@guard(policy="local-policy")
def run_agent(...): ...`}</pre>
            </div>
            <div className="card">
              <div className="index">step 03</div>
              <h3>Keep deferred states blocked</h3>
              <p>V1 can allow or block. A require-approval decision blocks dispatch; human approval is deferred.</p>
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
              <h3>Read the limitations</h3>
              <p>The repository documents which adapters are compatibility-only and which broker proof is still missing.</p>
              <pre className="code-block" style={{ marginTop: 14 }}>github.com/thebotclub/agentguard-core</pre>
            </div>
          </div>
        </div>
      </section>

      {/* OpenClaw section */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow amber">OpenClaw · compatibility path</span>
              <h2 style={{ marginTop: 14 }}>Observe hook events. Keep the limit visible.</h2>
              <p className="lede" style={{ marginTop: 14 }}>
                The current TypeScript package includes a structural OpenClaw
                before_tool_call HTTP hook. It can
                return a block result, but it does not own the raw tool capability
                and is not firewall proof.
              </p>
              <ul style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: 18, paddingLeft: 18 }}>
                <li>Current artifact: TypeScript compatibility hook.</li>
                <li>Strict mode can return a block when evaluation fails.</li>
                <li>Permissive mode allows on evaluation error.</li>
                <li>Executor-owned MCP-stdio broker proof is pending.</li>
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
        "spec": "@the-bot-club/agentguard@0.11.0"
      }
    }
  }
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Tribunal pair */}
      <section className="section">
        <div className="container">
          <div className="pair-card">
            <span className="eyebrow plain">Independent projects</span>
            <h2 style={{ marginTop: 14, maxWidth: '24ch' }}>
              One event spec. One policy DSL. One audit log.
            </h2>
            <p className="lede" style={{ marginTop: 14 }}>
              AgentGuard and Tribunal are <strong style={{ color: 'var(--text)' }}>separate projects</strong> with
              {' '}<strong style={{ color: 'var(--text)' }}>separate release lines</strong>. AgentGuard currently focuses
              on policy contracts and compatibility paths for runtime actions;
              the shared branding does not imply shared proof or complete agent coverage.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a className="btn btn-secondary btn-sm" href="https://tribunal.dev">
                tribunal.dev →
              </a>
              <Link className="btn btn-ghost btn-sm" href="/compliance">
                Read the assurance limits →
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
              <span className="eyebrow plain">Availability</span>
              <h2 style={{ marginTop: 14 }}>Packages are public. Paid terms are not.</h2>
            </div>
            <Link href="/pricing" className="btn btn-ghost btn-sm">Read availability status →</Link>
          </div>
          <div className="price-grid">
            <div className="price-card">
              <h3>TypeScript</h3>
              <div className="amount">0.11.0 <small>/ TypeScript</small></div>
              <ul>
                <li>Published package manifest</li>
                <li>Canonical local v1 contracts</li>
                <li>OpenClaw compatibility hook</li>
                <li>BSL 1.1 source licence</li>
              </ul>
            </div>
            <div className="price-card featured">
              <h3>Python</h3>
              <div className="amount">0.11.1 <small>/ Python</small></div>
              <ul>
                <li>Independent compatibility release</li>
                <li>HTTP policy evaluation</li>
                <li>No TypeScript v1 parity claim</li>
                <li>BSL 1.1 source licence</li>
                <li>Published package manifest</li>
              </ul>
            </div>
            <div className="price-card">
              <h3>Firewall proof</h3>
              <div className="amount">Pending <small>/ topology gate</small></div>
              <ul>
                <li>Executor-owned broker required</li>
                <li>Raw capability held outside OpenClaw</li>
                <li>Topology evidence not yet complete</li>
                <li>No production assurance claim</li>
                <li>Failure probes are planned</li>
                <li>Host-compromise limits stay explicit</li>
              </ul>
            </div>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', marginTop: 20, fontFamily: 'var(--font-mono)' }}>
            No public prices, paid tiers, retention promises, or SLA are offered. <Link href="/pricing" style={{ color: 'var(--teal)' }}>Read why →</Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '24ch', margin: '0 auto' }}>
            Evaluate the narrow path on its evidence.
          </h2>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Discuss a technical evaluation
            </a>
            <Link className="btn btn-secondary" href="/playground">
              Inspect policy decisions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
