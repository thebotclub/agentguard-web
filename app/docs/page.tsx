import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Docs — redirecting',
  robots: { index: false, follow: false },
  other: { refresh: '0; url=https://docs.agentguard.tech' },
};

export default function DocsRedirect() {
  return (
    <section className="section flush" style={{ paddingTop: 120, textAlign: 'center' }}>
      <div className="container">
        <h1>Redirecting&hellip;</h1>
        <p className="lede" style={{ margin: '14px auto 0' }}>
          Taking you to <a href="https://docs.agentguard.tech" style={{ color: 'var(--teal)' }}>docs.agentguard.tech</a>.
        </p>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('https://docs.agentguard.tech');`,
          }}
        />
      </div>
    </section>
  );
}
