import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of use',
  description:
    'Terms that govern use of the AgentGuard website at agentguard.tech.',
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <span className="eyebrow plain">Legal</span>
        <h1 style={{ marginTop: 14 }}>Terms of use</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          Last updated: 14 November 2026
        </p>

        <div className="prose" style={{ marginTop: 48 }}>
          <h2>1. About these terms</h2>
          <p>
            These terms of use (“Terms”) govern your access to and use of the
            AgentGuard website at{' '}
            <a href="https://agentguard.tech">agentguard.tech</a> (the
            “Website”), operated by The Bot Club Pty Ltd (ABN 99 695 980 226)
            (“we”, “us”, or “our”). By using the Website you agree to these
            Terms. If you do not agree, do not use the Website.
          </p>
          <p>
            Our registered office is Level 27, 101 Collins Street, Melbourne,
            VIC 3000, Australia. How we handle personal information is
            described in our{' '}
            <Link href="/privacy">privacy policy</Link>.
          </p>

          <h2>2. What the Website is</h2>
          <p>
            AgentGuard is a preview product for local policy evaluation of AI
            agent actions. The Website describes the current packages,
            documentation, limitations, and proof status. Executor-owned
            firewall proof remains pending, as stated on the Website.
          </p>
          <p>
            Published TypeScript and Python packages are available from npm
            and PyPI. Those packages are licensed under BSL 1.1, as described
            on the{' '}
            <Link href="/docs/#source">source section of the docs</Link>. The
            package licences, not these Terms, govern your use of the
            packages themselves.
          </p>
          <p>
            Packages are public. This Website does not offer paid plans or
            paid terms. Conversations and technical evaluations booked through
            the Website are not paid offers, service commitments, or readiness
            assessments.
          </p>

          <h2>3. Acceptable use</h2>
          <p>
            You may use the Website only for lawful purposes and in
            accordance with these Terms. You must not:
          </p>
          <ul>
            <li>
              attempt to gain unauthorised access to any part of the Website
              or its underlying infrastructure;
            </li>
            <li>
              interfere with or disrupt the integrity, availability, or
              performance of the Website;
            </li>
            <li>use the Website to transmit malicious code or harmful data;</li>
            <li>
              use the Website in a way that imposes an unreasonable load on
              our infrastructure; or
            </li>
            <li>misrepresent the Website’s published proof or assurance status.</li>
          </ul>
          <p>
            The public policy evaluator is a demonstration against demo
            policy. It does not execute agent tools and is not evidence of an
            executor-owned broker boundary.
          </p>

          <h2>4. Intellectual property</h2>
          <p>
            The Website and its content are owned by us or our licensors.
            You may view and share links to the Website for lawful purposes.
            You may not copy, modify, or republish substantial parts of the
            Website without our prior written consent, except as permitted by
            law or by the licences that apply to published packages and other
            separately licensed materials.
          </p>

          <h2>5. No warranty</h2>
          <p>
            The Website is provided as is, for general information. We do not
            warrant that it will be uninterrupted, error-free, or current,
            or that it will meet your requirements. To the extent permitted
            by law, we exclude all warranties and representations that are
            not expressly set out in these Terms. Nothing in these Terms
            excludes any rights you may have under the Australian Consumer
            Law that cannot be excluded.
          </p>

          <h2>6. Liability</h2>
          <p>
            To the extent permitted by law, we are not liable for any
            indirect, incidental, special, or consequential loss, or for any
            loss of profit, revenue, data, or goodwill, arising from your
            use of the Website. Where our liability cannot be excluded, it
            is limited to resupplying the relevant Website content or the
            cost of doing so, at our option.
          </p>

          <h2>7. Changes</h2>
          <p>
            We may update these Terms from time to time. The “Last updated”
            date at the top of the page indicates when they were last
            revised. Continued use of the Website after a change constitutes
            acceptance of the updated Terms.
          </p>

          <h2>8. Governing law</h2>
          <p>
            These Terms are governed by the laws of Victoria, Australia. You
            and we submit to the exclusive jurisdiction of the courts of
            Victoria.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these Terms:{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a>.
          </p>
          <p>
            The Bot Club Pty Ltd, Level 27, 101 Collins Street, Melbourne, VIC
            3000, Australia.
          </p>
          <p>Support is by email only. We reply within 1 business day.</p>
        </div>
      </div>
    </section>
  );
}
