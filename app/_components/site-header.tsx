'use client';
import Link from 'next/link';
import { BrandMark } from './brand-mark';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand" aria-label="AgentGuard home">
          <BrandMark />
          <span>AgentGuard</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <div className="nav-links">
            <Link href="/openclaw">OpenClaw</Link>
            <Link href="/compliance">Compliance</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/self-hosted">Self-hosted</Link>
            <a href="https://docs.agentguard.tech">Docs</a>
            <a href="https://github.com/thebotclub/agentguard">GitHub</a>
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <a
              className="btn btn-secondary btn-sm"
              href="https://demo.agentguard.tech"
            >
              Demo
            </a>
            <a
              className="btn btn-primary btn-sm"
              href="https://cal.com/hanikoshaji/cps230-review"
            >
              Book a review
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
