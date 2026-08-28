import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export const metadata: Metadata = {
  title: "Reading APRA's May 1 letter as an Australian fintech CTO",
  description:
    'Commentary on APRA’s public AI letter for technical operators. This article is not legal, compliance, or assurance advice.',
  openGraph: {
    title: "Reading APRA's May 1 letter as an Australian fintech CTO",
    description:
      'A technical operator’s reading of a public APRA letter, with no product compliance outcome claimed.',
    url: 'https://agentguard.tech/blog/reading-apra-may-1-letter/',
    type: 'article',
    publishedTime: '2026-05-15T00:00:00Z',
    authors: ['Hani Koshaji'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reading APRA's May 1 letter as an Australian fintech CTO",
    description: 'Commentary on a public APRA letter, not compliance advice.',
  },
};

function loadPost(): { frontmatter: Record<string, string>; html: string } {
  const file = path.join(process.cwd(), 'content/blog/reading-apra-may-1-letter.md');
  const raw = fs.readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const frontmatter: Record<string, string> = {};
  let body = raw;
  if (fmMatch) {
    fmMatch[1].split('\n').forEach((line) => {
      const m = line.match(/^(\w+):\s*"?(.*?)"?$/);
      if (m) frontmatter[m[1]] = m[2];
    });
    body = fmMatch[2];
  }
  // Drop the first H1 — the page hero handles the title
  body = body.replace(/^#\s+.*\n/, '');
  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(body) as string;
  return { frontmatter, html };
}

export default function Page() {
  const { frontmatter, html } = loadPost();
  return (
    <article className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          ← All posts
        </Link>
        <header style={{ marginTop: 28, marginBottom: 36 }}>
          <span className="eyebrow amber">APRA · CPS 230 · EU AI Act</span>
          <h1 style={{ marginTop: 14, lineHeight: 1.15 }}>
            Reading APRA's May 1 letter as an Australian fintech CTO
          </h1>
          <p className="lede" style={{ marginTop: 14 }}>
            Commentary on the public letter. Not legal or compliance advice.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: 18, fontFamily: 'var(--font-mono)' }}>
            {frontmatter.author || 'Hani Koshaji'} · 15 May 2026 · 12 min read
          </p>
        </header>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div style={{ marginTop: 56, padding: '28px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 14 }}>
          <h3 style={{ marginTop: 0 }}>Current AgentGuard status</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            AgentGuard currently provides policy contracts and compatibility
            telemetry. The OpenClaw hook can be disabled or bypassed, and the
            executor-owned MCP-stdio broker required for firewall proof is still
            pending.
          </p>
          <div className="cta-row" style={{ justifyContent: 'flex-start', marginTop: 18 }}>
            <a className="btn btn-primary" href="https://calendly.com/hani-thebot/30min">
              Discuss a technical evaluation
            </a>
            <Link className="btn btn-secondary" href="/compliance/">
              Read the assurance limits
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
