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
            <Link href="/trust">Trust</Link>
            <Link href="/playground">Policy evaluator</Link>
            <Link href="/compliance">Assurance status</Link>
            <Link href="/pricing">Availability</Link>
            <Link href="/self-hosted">Deployment status</Link>
            <a href="https://github.com/thebotclub/agentguard-core#readme">Docs</a>
            <a href="https://github.com/thebotclub/agentguard-core">GitHub</a>
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <Link
              className="btn btn-secondary btn-sm"
              href="/playground"
            >
              Evaluate policy
            </Link>
            <a
              className="btn btn-primary btn-sm"
              href="https://calendly.com/hani-thebot/30min"
            >
              Book a review
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
