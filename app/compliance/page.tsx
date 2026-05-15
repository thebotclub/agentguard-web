import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance — CPS 230, EU AI Act, ISO 42001',
  description:
    'One PDF, signed and Bitcoin-anchored, that your auditor and your board accept. APRA CPS 230 evidence pack with EU AI Act and ISO 42001 mappings.',
};

export default function CompliancePage() {
  return (
    <>
      <section className="section flush" style={{ paddingTop: 96 }}>
        <div className="container">
          <span className="eyebrow">Compliance pack</span>
          <h1 style={{ marginTop: 18, maxWidth: '24ch' }}>
            One PDF, signed and Bitcoin-anchored, that your auditor and your board accept.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            The AgentGuard Compliance pack is the artefact your CRO opens when
            APRA asks &ldquo;tell me about your AI agents&rdquo;. It maps every action
            your production agents took to APRA{' '}
            <a href="https://www.apra.gov.au/sites/default/files/2023-07/Prudential%20Standard%20CPS%20230%20Operational%20Risk%20Management%20-%20clean.pdf" style={{ color: 'var(--teal)' }}>
              CPS 230 Operational Risk Management
            </a>
            , the{' '}
            <a href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act" style={{ color: 'var(--teal)' }}>
              EU AI Act implementation timeline
            </a>
            , and ISO 42001 controls. One PDF. Signed. Anchored. Done.
          </p>
          <div className="cta-row" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
            <a className="btn btn-primary" href="https://cal.com/hanikoshaji/cps230-review">
              Book a readiness review
            </a>
            <a className="btn btn-secondary" href="https://demo.agentguard.tech/sample-pack.pdf">
              View sample pack
            </a>
          </div>
        </div>
      </section>

      {/* What's in it */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow plain">What&rsquo;s in it</span>
              <h2 style={{ marginTop: 14 }}>Built for the audit, not for the brochure.</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                The pack is generated from your live audit log and reviewed against
                a control library that maps directly to the frameworks your
                auditor already uses. Every row links back to a signed event in
                the log, anchored to the Bitcoin block-chain so the record is
                tamper-evident.
              </p>
              <ul style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginTop: 18, paddingLeft: 18 }}>
                <li>Control narratives mapped to CPS 230 §§13–22 and §§35–40</li>
                <li>EU AI Act Annex III high-risk obligations &amp; transparency duties</li>
                <li>ISO 42001 control implementation statements</li>
                <li>Statistical sampling plan (50 / 100 / 200 events)</li>
                <li>Spend &amp; rate-limit attestations</li>
                <li>Tool-call inventory and approval log</li>
                <li>Signed Merkle root + Bitcoin anchor transaction ID</li>
              </ul>
            </div>
            <div>
              <span className="eyebrow plain">Sample TOC</span>
              <div className="toc" style={{ marginTop: 14 }}>
                <div><span className="toc-num">01</span> Executive summary</div>
                <div><span className="toc-num">02</span> Scope &amp; agent inventory</div>
                <div><span className="toc-num">03</span> Risk taxonomy &amp; control map</div>
                <div><span className="toc-num">04</span> CPS 230 control narratives</div>
                <div><span className="toc-num">05</span> EU AI Act Article 9 / 10 / 13 / 14</div>
                <div><span className="toc-num">06</span> ISO 42001 control statements</div>
                <div><span className="toc-num">07</span> Statistical sampling &amp; testing</div>
                <div><span className="toc-num">08</span> Incident &amp; killswitch register</div>
                <div><span className="toc-num">09</span> Third-party &amp; model registry</div>
                <div><span className="toc-num">10</span> Signature &amp; chain anchor proof</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it's generated */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">How it&rsquo;s generated</span>
          <h2 style={{ marginTop: 14 }}>One command. One signed PDF.</h2>
          <div className="grid-3" style={{ marginTop: 28 }}>
            <div className="card">
              <div className="index">/01</div>
              <h3>Stream events</h3>
              <p>Every tool call, every model output, every spend event flows into the audit log as it happens &mdash; signed at write time.</p>
            </div>
            <div className="card">
              <div className="index">/02</div>
              <h3>Map to frameworks</h3>
              <p>Control library applies CPS 230, EU AI Act, and ISO 42001 mappings to each event class. You can override the mapping for bespoke controls.</p>
            </div>
            <div className="card">
              <div className="index">/03</div>
              <h3>Anchor &amp; sign</h3>
              <p>The pack&rsquo;s Merkle root is anchored to Bitcoin via OpenTimestamps. The PDF is signed with your CA-issued key.</p>
            </div>
          </div>
          <div className="code-window" style={{ marginTop: 28 }}>
            <div className="code-window-header">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span style={{ marginLeft: 8 }}>terminal</span>
            </div>
            <pre>{`$ agentguard evidence build \\
    --framework cps230,eu_ai_act,iso42001 \\
    --window 2026-04-01..2026-06-30 \\
    --sample 100 \\
    --anchor btc \\
    --sign ./keys/cro.pem

  ✓ 84,213 events scanned
  ✓ 12 controls mapped (CPS 230 §§13–22, §§35–40)
  ✓ 18 controls mapped (EU AI Act Annex III)
  ✓ 9 controls mapped (ISO 42001)
  ✓ Merkle root anchored — txid: 4f2c…b91d
  ✓ Signed PDF: ./evidence/cps230-2026Q2.pdf  (4.2 MB)`}</pre>
          </div>
        </div>
      </section>

      {/* EU AI Act subsection */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">EU AI Act</span>
          <h2 style={{ marginTop: 14 }}>Ready for the high-risk obligations.</h2>
          <div className="split" style={{ marginTop: 28 }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              The EU AI Act&rsquo;s high-risk obligations land in waves through 2026 and
              2027. AgentGuard ships pre-built mappings for{' '}
              <a href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act" style={{ color: 'var(--teal)' }}>
                every gate in the official implementation timeline
              </a>{' '}
              &mdash; risk management (Art. 9), data &amp; governance (Art. 10),
              technical documentation (Art. 11), record-keeping (Art. 12),
              transparency (Art. 13), and human oversight (Art. 14). Each is
              cross-linked to its CPS 230 cousin so AU teams aren&rsquo;t maintaining
              two control libraries.
            </p>
            <dl className="dl">
              <dt>Risk management</dt><dd>Art. 9</dd>
              <dt>Data governance</dt><dd>Art. 10</dd>
              <dt>Technical documentation</dt><dd>Art. 11</dd>
              <dt>Record keeping</dt><dd>Art. 12</dd>
              <dt>Transparency</dt><dd>Art. 13</dd>
              <dt>Human oversight</dt><dd>Art. 14</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* ISO 42001 */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">ISO/IEC 42001</span>
          <h2 style={{ marginTop: 14 }}>AI management system, evidence first.</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7, maxWidth: '70ch' }}>
            ISO 42001 is the AI management system standard your certification
            body will start auditing against in 2026. AgentGuard maps clauses
            6–10 (planning, support, operation, performance evaluation,
            improvement) to live evidence pulled from your audit log &mdash; so the
            initial certification audit and the surveillance audits use the same
            artefact your APRA submission already used.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">Who it&rsquo;s for</span>
          <h2 style={{ marginTop: 14 }}>If APRA writes to you, this is for you.</h2>
          <div className="grid-3" style={{ marginTop: 28 }}>
            <div className="card">
              <h3>Neobanks &amp; BNPL</h3>
              <p>50–500 employees, scaling AI agents in customer ops &amp; collections, with a CISO who&rsquo;s now also accountable for AI risk.</p>
            </div>
            <div className="card">
              <h3>Super funds</h3>
              <p>Mid-market funds modernising member services, where SPS 220 and CPS 230 overlap and the board needs one artefact.</p>
            </div>
            <div className="card">
              <h3>Mortgage &amp; lending tech</h3>
              <p>Brokers and originators using AI in credit decisioning, where ASIC, AUSTRAC, and APRA all want a paper trail.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '26ch', margin: '0 auto' }}>
            Stop building bespoke evidence packs. Generate them.
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
