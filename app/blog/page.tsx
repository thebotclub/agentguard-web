import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Blog' };

export default function BlogPage() {
  return (
    <section className="section flush" style={{ paddingTop: 96 }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <span className="eyebrow plain">Blog</span>
        <h1 style={{ marginTop: 18 }}>Coming soon.</h1>
        <p className="lede" style={{ marginTop: 18 }}>
          We&rsquo;re working on the first set of posts: CPS 230 readiness
          checklists, OpenClaw fleet incident reports, and what auditors
          actually open first in a compliance pack. Subscribe via{' '}
          <a href="https://github.com/thebotclub/agentguard-core" style={{ color: 'var(--teal)' }}>GitHub</a>{' '}
          for now &mdash; we&rsquo;ll post here when posts go live.
        </p>
        <div className="cta-row" style={{ justifyContent: 'flex-start', marginTop: 28 }}>
          <Link className="btn btn-secondary" href="/">Back to home</Link>
          <a className="btn btn-ghost" href="https://github.com/thebotclub/agentguard-core#readme">Read the docs →</a>
        </div>
      </div>
    </section>
  );
}
