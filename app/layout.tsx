import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from './_components/site-header';
import { SiteFooter } from './_components/site-footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://agentguard.tech'),
  title: {
    default: 'AgentGuard — Local policy evaluation for AI agent actions',
    template: '%s · AgentGuard',
  },
  description:
    'AgentGuard provides local policy contracts and compatibility telemetry for AI agent actions. Executor-owned firewall proof is still in progress.',
  openGraph: {
    title: 'AgentGuard',
    description:
      'Local policy contracts and compatibility telemetry for AI agent actions, with explicit assurance limits.',
    url: 'https://agentguard.tech',
    siteName: 'AgentGuard',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'AgentGuard — local AI agent policy evaluation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentGuard',
    description: 'Local policy evaluation and compatibility telemetry for AI agent actions.',
    images: ['/og.png'],
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=document.cookie.match(/ag_theme=(dark|light)/);var pref=t?t[1]:'dark';document.documentElement.setAttribute('data-theme',pref);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
