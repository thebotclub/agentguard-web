import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Self-hosting status',
  description:
    'The AgentGuard repository includes self-hosting references. No supported image, chart, cluster, or isolated-environment distribution is claimed.',
};

export default function SelfHostedPage() {
  return (
    <>
      <section className="section flush" style={{ paddingTop: 96 }}>
        <div className="container">
          <span className="eyebrow plain">Self-hosting references</span>
          <h1 style={{ marginTop: 18, maxWidth: '24ch' }}>
            Inspect the local sources before choosing a deployment path.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            The repository contains Docker Compose, Helm, and self-hosting source
            references. Their presence does not establish a released image or
            chart, a supported cluster topology, outbound-call behavior, or an
            isolated-environment assurance claim.
          </p>
          <div className="cta-row" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Discuss source evaluation
            </a>
            <a className="btn btn-secondary" href="https://github.com/thebotclub/agentguard-core/tree/main/self-hosted#readme">
              Read repository notes →
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow plain">Docker Compose</span>
              <h2 style={{ marginTop: 14 }}>A checked-in reference, not an image promise.</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                Review the checked-in Compose files and environment template in a
                private test environment. Validate every dependency, network path,
                volume, credential, and failure mode before use.
              </p>
            </div>
            <div className="code-window">
              <div className="code-window-header">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span style={{ marginLeft: 8 }}>docker-compose.yml</span>
              </div>
              <pre>{`# From a reviewed source checkout
cp .env.example .env

# Inspect before running
git diff -- self-hosted/ docker-compose.yml
docker compose config

# No public image or support promise is implied.`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow plain">Helm source</span>
              <h2 style={{ marginTop: 14 }}>Chart source needs environment-specific review.</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                A checked-in Helm directory is available for inspection. This page
                does not claim a published chart, supported cluster matrix,
                production readiness, or equivalent enforcement across platforms.
              </p>
            </div>
            <div className="code-window">
              <div className="code-window-header">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span style={{ marginLeft: 8 }}>terminal</span>
              </div>
              <pre>{`# Inspect the checked-in chart source
git ls-files helm/ self-hosted/

# Render locally before any cluster use
helm lint ./helm/agentguard
helm template agentguard ./helm/agentguard

# No hosted chart repository is claimed.`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '28ch', margin: '0 auto' }}>
            Need a private deployment boundary?
          </h2>
          <p className="lede" style={{ margin: '14px auto 0', textAlign: 'center' }}>
            Start with the repository and verify the exact topology yourself.
            No paid deployment tier or isolated-environment support commitment is
            published here.
          </p>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Discuss source evaluation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
