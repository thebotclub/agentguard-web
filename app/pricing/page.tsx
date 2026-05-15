import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'AgentGuard pricing — Free, Team ($499 AUD/mo), Compliance ($2,500 AUD/mo flat), Enterprise.',
};

const features: Array<{
  label: string;
  free: string;
  team: string;
  compliance: string;
  enterprise: string;
}> = [
  { label: 'Agents', free: '1', team: '25', compliance: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'Evals / month', free: '1k', team: '50k', compliance: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'Retention', free: '7 days', team: '90 days', compliance: '1 year + cold archive', enterprise: 'Custom' },
  { label: 'SSO (Google, Microsoft)', free: '—', team: '✓', compliance: '✓', enterprise: '✓ (incl. SAML)' },
  { label: 'OpenClaw plugin', free: '✓', team: '✓', compliance: '✓', enterprise: '✓' },
  { label: 'CPS 230 evidence pack', free: '—', team: '—', compliance: '✓', enterprise: '✓' },
  { label: 'EU AI Act + ISO 42001 mappings', free: '—', team: '—', compliance: '✓', enterprise: '✓' },
  { label: 'Bitcoin-anchored audit roots', free: '—', team: 'Signed only', compliance: '✓', enterprise: '✓' },
  { label: 'On-prem / self-hosted', free: '✓ (community)', team: '—', compliance: 'Optional add-on', enterprise: '✓ (included)' },
  { label: 'SLA', free: '—', team: '99.5%', compliance: '99.9%', enterprise: '99.95% + 24×7' },
  { label: 'Quarterly readiness review', free: '—', team: '—', compliance: '✓', enterprise: '✓' },
  { label: 'Dedicated SE', free: '—', team: '—', compliance: '—', enterprise: '✓' },
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
          <span className="eyebrow plain">Pricing</span>
          <h1 style={{ marginTop: 18 }}>Flat-fee compliance. No per-seat surprises.</h1>
          <p className="hero-sub" style={{ marginTop: 14 }}>
            Built for finance procurement &mdash; predictable annual numbers, AUD
            invoices, ABN, full audit trail of payments.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="price-grid">
            <div className="price-card">
              <h3>Free</h3>
              <div className="amount">$0 <small>/ forever</small></div>
              <ul>
                <li>1 agent</li>
                <li>7-day retention</li>
                <li>Local audit log</li>
                <li>MIT-licensed SDK</li>
                <li>Community Discord</li>
              </ul>
            </div>
            <div className="price-card featured">
              <h3>Team</h3>
              <div className="amount">$499 <small>AUD / mo</small></div>
              <ul>
                <li>25 agents</li>
                <li>90-day retention</li>
                <li>SSO</li>
                <li>Signed audit roots</li>
                <li>Email support</li>
              </ul>
            </div>
            <div className="price-card">
              <h3>Compliance</h3>
              <div className="amount">$2,500 <small>AUD / mo flat</small></div>
              <ul>
                <li>Unlimited agents</li>
                <li>1-year retention + cold archive</li>
                <li>CPS 230 evidence pack</li>
                <li>EU AI Act + ISO 42001 mappings</li>
                <li>Bitcoin-anchored audit roots</li>
                <li>Quarterly readiness review</li>
              </ul>
            </div>
            <div className="price-card" style={{ gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <h3>Enterprise</h3>
                  <div className="amount" style={{ marginTop: 6 }}>Talk to us</div>
                  <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
                    On-prem / VPC deployment, 99.95% SLA, dedicated SE, custom retention, procurement-friendly contract.
                  </p>
                </div>
                <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
                  Book a call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow plain">Compare</span>
          <h2 style={{ marginTop: 14 }}>Full feature matrix</h2>
          <div style={{ overflowX: 'auto', marginTop: 12 }}>
            <table className="cmp-table">
              <thead>
                <tr>
                  <th style={{ width: '36%' }}>Feature</th>
                  <th>Free</th>
                  <th>Team</th>
                  <th>Compliance</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.label}>
                    <td className="row-label">{f.label}</td>
                    {cell(f.free)}
                    {cell(f.team)}
                    {cell(f.compliance)}
                    {cell(f.enterprise)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem', marginTop: 16, fontFamily: 'var(--font-mono)' }}>
            All prices in AUD, ex GST. Annual prepay available on Compliance and Enterprise.
          </p>
        </div>
      </section>

      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '26ch', margin: '0 auto' }}>
            Want a tailored quote?
          </h2>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">Book a CPS 230 readiness review</a>
            <a className="btn btn-secondary" href="mailto:[email protected]">[email protected]</a>
          </div>
        </div>
      </section>
    </>
  );
}
