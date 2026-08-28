import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compliance status and limitations',
  description:
    'Current AgentGuard evidence and assurance limits. No regulator, auditor, certification, or compliance outcome is claimed.',
};

export default function CompliancePage() {
  return (
    <>
      <section className="section flush" style={{ paddingTop: 96 }}>
        <div className="container">
          <span className="eyebrow">Assurance status</span>
          <h1 style={{ marginTop: 18, maxWidth: '24ch' }}>
            Evidence work in progress. No compliance outcome claimed.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            AgentGuard is developing local action-control and evidence contracts.
            The current public artifacts do not establish conformity with{' '}
            <a href="https://www.apra.gov.au/sites/default/files/2023-07/Prudential%20Standard%20CPS%20230%20Operational%20Risk%20Management%20-%20clean.pdf" style={{ color: 'var(--teal)' }}>
              APRA CPS 230
            </a>
            , the{' '}
            <a href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act" style={{ color: 'var(--teal)' }}>
              EU AI Act
            </a>
            , or ISO/IEC 42001. They also do not establish acceptance by any
            regulator, board, assessor, or independent certifier.
          </p>
          <div className="cta-row" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Discuss a technical evaluation
            </a>
            <a className="btn btn-secondary" href="/samples/cps230-evidence-pack-sample.pdf" target="_blank" rel="noopener">
              View unapproved sample PDF
            </a>
          </div>
        </div>
      </section>

      {/* What's in it */}
      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow plain">Current boundary</span>
              <h2 style={{ marginTop: 14 }}>What the public artifacts do not prove.</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                Repository source can show exact contracts, package manifests,
                compatibility adapters, and tests. It cannot by itself establish a
                deployed control, complete event coverage, non-bypassability, or a
                third party&rsquo;s acceptance.
              </p>
              <ul style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginTop: 18, paddingLeft: 18 }}>
                <li>No regulator or assessor acceptance claim</li>
                <li>No certification or legal-conformity claim</li>
                <li>No complete runtime-coverage claim</li>
                <li>No production or fleet claim</li>
                <li>No public performance or reliability claim</li>
                <li>No human-approval workflow in V1</li>
                <li>No public evidence-pack approval</li>
              </ul>
            </div>
            <div>
              <span className="eyebrow plain">Review checklist</span>
              <div className="toc" style={{ marginTop: 14 }}>
                <div><span className="toc-num">01</span> Exact artifact and version</div>
                <div><span className="toc-num">02</span> Capability owner and caller</div>
                <div><span className="toc-num">03</span> Policy authority</div>
                <div><span className="toc-num">04</span> Decision and permit scope</div>
                <div><span className="toc-num">05</span> Dispatch outcome scope</div>
                <div><span className="toc-num">06</span> Failure semantics</div>
                <div><span className="toc-num">07</span> Replay and freshness</div>
                <div><span className="toc-num">08</span> Rollback state</div>
                <div><span className="toc-num">09</span> Evidence provenance</div>
                <div><span className="toc-num">10</span> Stated limitations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence path */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">Evidence path</span>
          <h2 style={{ marginTop: 14 }}>Contracts first. Claims only after proof.</h2>
          <div className="grid-3" style={{ marginTop: 28 }}>
            <div className="card">
              <div className="index">/01</div>
              <h3>Bind the artifact</h3>
              <p>Identify the exact package, version, topology, policy, and action being evaluated.</p>
            </div>
            <div className="card">
              <div className="index">/02</div>
              <h3>Exercise the boundary</h3>
              <p>Test direct, alternate, disabled-hook, forged, replayed, and failure paths against an owned canary.</p>
            </div>
            <div className="card">
              <div className="index">/03</div>
              <h3>Publish the limits</h3>
              <p>Report samples, failures, exclusions, provenance, and host-compromise limits with the result.</p>
            </div>
          </div>
          <div className="code-window" style={{ marginTop: 28 }}>
            <div className="code-window-header">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span style={{ marginLeft: 8 }}>terminal</span>
            </div>
            <pre>{`Current public status

package contracts       available for inspection
compatibility adapters  available for inspection
broker topology proof   pending
production evidence     not claimed
compliance outcome      not claimed
third-party acceptance  not claimed`}</pre>
          </div>
        </div>
      </section>

      {/* EU AI Act subsection */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">EU AI Act</span>
          <h2 style={{ marginTop: 14 }}>A source to assess, not an outcome to assume.</h2>
          <div className="split" style={{ marginTop: 28 }}>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              The official implementation timeline is available from the{' '}
              <a href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act" style={{ color: 'var(--teal)' }}>
                EU AI Act Service Desk
              </a>{' '}
              for teams determining which obligations apply. AgentGuard does not
              claim that its current packages satisfy those obligations or replace
              legal, risk, or conformity assessment.
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
          <h2 style={{ marginTop: 14 }}>No certification claim.</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7, maxWidth: '70ch' }}>
            ISO/IEC 42001 defines requirements for an AI management system.
            AgentGuard&rsquo;s current repository is not a certification, does not
            establish conformity, and does not make an assessor&rsquo;s decision for
            an operator.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section">
        <div className="container">
          <span className="eyebrow plain">Who should evaluate it</span>
          <h2 style={{ marginTop: 14 }}>Technical operators testing a narrow boundary.</h2>
          <div className="grid-3" style={{ marginTop: 28 }}>
            <div className="card">
              <h3>Agent operators</h3>
              <p>Teams that can identify a consequential action and remove the raw capability from the calling agent.</p>
            </div>
            <div className="card">
              <h3>Security engineers</h3>
              <p>Reviewers who can test identity separation, bypass paths, permit use, failure semantics, and local evidence.</p>
            </div>
            <div className="card">
              <h3>Risk owners</h3>
              <p>People who need limitations and evidence provenance stated before deciding whether a control fits their environment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '26ch', margin: '0 auto' }}>
            Inspect the artifacts before assigning assurance.
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
