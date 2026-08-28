import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Availability status',
  description:
    'AgentGuard has no public paid tiers, prices, retention promises, or SLA. Review current packages and proof status.',
};

const features: Array<{
  label: string;
  current: string;
  evidence: string;
  limit: string;
  next: string;
}> = [
  { label: 'TypeScript SDK', current: '0.11.0', evidence: 'Package manifest', limit: 'Compatibility paths are not firewall proof', next: 'Topology proof' },
  { label: 'Python SDK', current: '0.11.1', evidence: 'Package manifest', limit: 'No TypeScript v1 parity claim', next: 'Compatibility fixes only' },
  { label: 'OpenClaw hook', current: 'Source available', evidence: 'Structural hook tests', limit: 'Can be disabled or bypassed', next: 'MCP-stdio broker' },
  { label: 'MCP adapters', current: 'Source available', evidence: 'HTTP/in-process tests', limit: 'No separate capability owner', next: 'MCP-stdio broker' },
  { label: 'Local v1 contracts', current: 'Source available', evidence: 'Schema and conformance tests', limit: 'No deployment outcome implied', next: 'Vertical broker path' },
  { label: 'Firewall proof', current: 'Pending', evidence: 'No GO artifact yet', limit: 'Unproven until topology gate', next: 'Owned canary spike' },
  { label: 'Public prices', current: 'Not published', evidence: 'No authorised offer', limit: 'No paid plan commitment', next: 'Future decision' },
  { label: 'Retention', current: 'Not promised', evidence: 'No authorised service terms', limit: 'No duration claim', next: 'Future decision' },
  { label: 'Service level', current: 'Not promised', evidence: 'No authorised SLA', limit: 'No availability claim', next: 'Future decision' },
  { label: 'Broad deployment', current: 'Not claimed', evidence: 'Repository references only', limit: 'No image, chart, or air-gap claim', next: 'Artifact proof' },
  { label: 'Compliance outcome', current: 'Not claimed', evidence: 'No third-party acceptance evidence', limit: 'No conformity claim', next: 'Future evidence' },
  { label: 'Human approval', current: 'Deferred', evidence: 'V1 failure semantics', limit: 'Require-approval blocks dispatch', next: 'V2' },
];

function cell(v: string) {
  if (v === '✓') return <td className="check">✓</td>;
  if (v === '—') return <td className="dash">—</td>;
  return <td>{v}</td>;
}

export default function PricingPage() {
  return (
    <>
      <section className="section flush" style={{ paddingTop: 96, textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow plain">Availability</span>
          <h1 style={{ marginTop: 18 }}>No public price or paid tier is offered.</h1>
          <p className="hero-sub" style={{ marginTop: 14 }}>
            The packages can be inspected today. Commercial terms, service levels,
            retention promises, and broad deployment offers remain unpublished.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="price-grid">
            <div className="price-card">
              <h3>TypeScript SDK</h3>
              <div className="amount">0.11.0 <small>/ TypeScript</small></div>
              <ul>
                <li>Published package manifest</li>
                <li>Canonical local v1 contracts</li>
                <li>OpenClaw compatibility hook</li>
                <li>MCP compatibility adapters</li>
                <li>BSL 1.1 source licence</li>
              </ul>
            </div>
            <div className="price-card featured">
              <h3>Python SDK</h3>
              <div className="amount">0.11.1 <small>/ Python</small></div>
              <ul>
                <li>Independent release line</li>
                <li>HTTP policy evaluation</li>
                <li>Compatibility adapters</li>
                <li>No TypeScript v1 parity claim</li>
                <li>BSL 1.1 source licence</li>
              </ul>
            </div>
            <div className="price-card">
              <h3>Broker proof</h3>
              <div className="amount">Pending <small>/ topology gate</small></div>
              <ul>
                <li>Executor-owned MCP-stdio path</li>
                <li>Raw capability outside OpenClaw</li>
                <li>Owned canary action</li>
                <li>Bypass probes</li>
                <li>No GO artifact yet</li>
                <li>No production assurance claim</li>
              </ul>
            </div>
            <div className="price-card" style={{ gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <h3>Commercial terms</h3>
                  <div className="amount" style={{ marginTop: 6 }}>Not published</div>
                  <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
                    No public price, paid tier, support commitment, service level,
                    deployment promise, or retention term is offered in this phase.
                  </p>
                </div>
                <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
                  Discuss a technical evaluation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow plain">Current truth</span>
          <h2 style={{ marginTop: 14 }}>Artifact and claim status</h2>
          <div style={{ overflowX: 'auto', marginTop: 12 }}>
            <table className="cmp-table">
              <thead>
                <tr>
                  <th style={{ width: '36%' }}>Area</th>
                  <th>Current</th>
                  <th>Evidence</th>
                  <th>Limit</th>
                  <th>Next gate</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.label}>
                    <td className="row-label">{f.label}</td>
                    {cell(f.current)}
                    {cell(f.evidence)}
                    {cell(f.limit)}
                    {cell(f.next)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem', marginTop: 16, fontFamily: 'var(--font-mono)' }}>
            Status only. This page is not an offer, quote, SLA, or service commitment.
          </p>
        </div>
      </section>

      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '26ch', margin: '0 auto' }}>
            Want to evaluate the current artifacts?
          </h2>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">Discuss a technical evaluation</a>
            <a className="btn btn-secondary" href="mailto:[email protected]">Email the project maintainer</a>
          </div>
        </div>
      </section>
    </>
  );
}
