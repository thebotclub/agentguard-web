import Link from 'next/link';
import { BrandMark } from './brand-mark';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 14 }}>
              <BrandMark size={24} />
              <span>AgentGuard</span>
            </div>
            <p style={{ color: 'var(--text-muted)', maxWidth: '32ch', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Local policy contracts and compatibility telemetry for AI agent
              actions. Executor-owned broker proof remains pending.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><Link href="/openclaw">OpenClaw compatibility</Link></li>
              <li><Link href="/trust">Trust and limitations</Link></li>
              <li><Link href="/proof">Named-action proof</Link></li>
              <li><Link href="/compliance">Assurance status</Link></li>
              <li><Link href="/self-hosted">Deployment status</Link></li>
              <li><Link href="/playground">Policy evaluator</Link></li>
            </ul>
          </div>
          <div>
            <h4>Developers</h4>
            <ul>
              <li><Link href="/docs/">Documentation</Link></li>
              <li><Link href="/docs/#source">Source</Link></li>
              <li><a href="https://www.npmjs.com/package/@the-bot-club/agentguard">npm</a></li>
              <li><a href="https://pypi.org/project/agentguard-tech/">PyPI</a></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><a href="https://calendly.com/hani-thebot/30min">Book a review</a></li>
              <li><a href="mailto:hani@thebot.club">Contact</a></li>
              <li><a href="https://tribunal.dev">Tribunal (coding agents)</a></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} The Bot Club Pty Ltd · ABN 99 695 980 226</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/privacy" style={{ color: 'var(--text-dim)' }}>Privacy</Link>
            <Link href="/terms" style={{ color: 'var(--text-dim)' }}>Terms</Link>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              Proof status pending · built in Melbourne
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
