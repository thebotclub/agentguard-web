import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Self-hosted',
  description:
    'Deploy AgentGuard on-prem or in your own VPC. Docker, Helm, and air-gapped install paths.',
};

export default function SelfHostedPage() {
  return (
    <>
      <section className="section flush" style={{ paddingTop: 96 }}>
        <div className="container">
          <span className="eyebrow plain">Self-hosted</span>
          <h1 style={{ marginTop: 18, maxWidth: '24ch' }}>
            Your agents stay in your VPC. Your audit log stays on your disk.
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            AgentGuard ships as a single container or a Helm chart. The runtime
            enforcer and the evidence-builder both run entirely inside your
            perimeter &mdash; no outbound calls required, no SaaS dependency at
            request time. Suitable for ISM-aligned and air-gapped environments.
          </p>
          <div className="cta-row" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Talk to us about on-prem
            </a>
            <a className="btn btn-secondary" href="https://github.com/thebotclub/agentguard-core/tree/main/self-hosted#readme">
              Read self-hosted docs →
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow plain">Docker</span>
              <h2 style={{ marginTop: 14 }}>Single container.</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                The control-plane and policy engine ship in one image. Mount your
                policy directory, point your agents at the local socket, and
                you&rsquo;re governed. Suitable for staging, single-node prod, or
                development &mdash; with the same enforcement guarantees as the
                clustered build.
              </p>
            </div>
            <div className="code-window">
              <div className="code-window-header">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span style={{ marginLeft: 8 }}>docker-compose.yml</span>
              </div>
              <pre>{`services:
  agentguard:
    image: ghcr.io/thebotclub/agentguard:0.4
    ports:
      - "7474:7474"     # control plane
      - "7475:7475"     # event ingest
    volumes:
      - ./policies:/etc/agentguard/policies:ro
      - ./evidence:/var/agentguard/evidence
    environment:
      AG_LICENSE: \${AG_LICENSE}
      AG_ANCHOR:  btc
      AG_FLEET_ID: bnb-prod`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow plain">Helm</span>
              <h2 style={{ marginTop: 14 }}>Kubernetes-native.</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>
                The Helm chart deploys a 3-replica control plane, a persistent
                event-store StatefulSet, and a CronJob that builds the
                evidence pack on your audit cadence. Compatible with EKS, GKE,
                AKS, and on-prem k3s / OpenShift.
              </p>
            </div>
            <div className="code-window">
              <div className="code-window-header">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span style={{ marginLeft: 8 }}>terminal</span>
              </div>
              <pre>{`# Add the chart repo
helm repo add agentguard https://charts.agentguard.tech
helm repo update

# Install
helm install agentguard agentguard/agentguard \\
  --namespace agentguard --create-namespace \\
  --set license=$AG_LICENSE \\
  --set anchor=btc \\
  --set fleetId=bnb-prod \\
  --set retention.days=365

# Confirm
$ kubectl -n agentguard get pods
  agentguard-control-plane-0   1/1   Running
  agentguard-control-plane-1   1/1   Running
  agentguard-control-plane-2   1/1   Running
  agentguard-store-0           1/1   Running`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ maxWidth: '28ch', margin: '0 auto' }}>
            Air-gapped, ISM-aligned, or VPC-only?
          </h2>
          <p className="lede" style={{ margin: '14px auto 0', textAlign: 'center' }}>
            That&rsquo;s the Enterprise tier. Talk to us &mdash; we&rsquo;ll walk you
            through the install in your environment.
          </p>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Book an on-prem review
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
