import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section flush" style={{ paddingTop: 120, textAlign: 'center' }}>
      <div className="container">
        <span className="eyebrow amber">404</span>
        <h1 style={{ marginTop: 14 }}>Page not found.</h1>
        <p className="lede" style={{ margin: '14px auto 0' }}>
          That route isn&rsquo;t governed by anything we built. Try the homepage.
        </p>
        <div className="cta-row" style={{ marginTop: 24 }}>
          <Link className="btn btn-primary" href="/">Back to home</Link>
          <a className="btn btn-secondary" href="https://docs.agentguard.tech">Read the docs</a>
        </div>
      </div>
    </section>
  );
}
