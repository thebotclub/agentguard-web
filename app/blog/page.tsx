import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on agent action control, public governance sources, and the evidence needed before making stronger claims.',
};

const posts = [
  {
    slug: 'reading-apra-may-1-letter',
    title: "Reading APRA's May 1 letter as an Australian fintech CTO",
    subtitle: 'A reading of the public letter, not compliance advice.',
    date: '15 May 2026',
    readTime: '12 min',
    tags: ['APRA', 'CPS 230', 'EU AI Act'],
  },
];

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 880 }}>
        <span className="eyebrow plain">Blog</span>
        <h1 style={{ marginTop: 14 }}>Notes on agent control.</h1>
        <p className="lede" style={{ marginTop: 14, maxWidth: '52ch' }}>
          Technical notes on policy boundaries, compatibility paths, and public
          governance sources. Product claims stay separate from commentary.
        </p>

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              style={{
                display: 'block',
                padding: '32px',
                border: '1px solid var(--border)',
                borderRadius: 14,
                background: 'var(--panel)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
            >
              <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                {p.tags.map((t) => (
                  <span key={t} className="chip" style={{ fontSize: '0.75rem' }}>
                    {t}
                  </span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontSize: '1.55rem', lineHeight: 1.25 }}>{p.title}</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 10, fontSize: '1.02rem' }}>
                {p.subtitle}
              </p>
              <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginTop: 18 }}>
                {p.date} · {p.readTime}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
