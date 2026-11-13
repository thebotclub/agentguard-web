import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'How The Bot Club Pty Ltd collects, uses, and stores personal information on agentguard.tech.',
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <span className="eyebrow plain">Legal</span>
        <h1 style={{ marginTop: 14 }}>Privacy policy</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          Last updated: 14 November 2026
        </p>

        <div className="prose" style={{ marginTop: 48 }}>
          <h2>1. About this policy</h2>
          <p>
            This privacy policy explains how The Bot Club Pty Ltd (ABN 99 695
            980 226) — referred to in this policy as “we”, “us”, or “our” —
            collects, uses, stores, and discloses personal information through
            the AgentGuard website at{' '}
            <a href="https://agentguard.tech">agentguard.tech</a>.
          </p>
          <p>
            AgentGuard is a preview product for local policy evaluation of AI
            agent actions. This policy covers visitors to the website, people
            who email us, people who book a technical evaluation, and people
            who use the on-site policy evaluator. It does not cover personal
            information collected by other Bot Club products or websites, each
            of which has its own privacy policy. The published AgentGuard
            packages you install on your own systems are governed by their
            licences; this policy applies when those packages or you send
            information to our services.
          </p>
          <p>
            We treat the Australian Privacy Act 1988 as applying to this
            website. These pages should be read together with our{' '}
            <Link href="/terms">terms of use</Link>.
          </p>

          <h2>2. The information we collect</h2>
          <p>
            We collect personal information that you provide to us directly,
            and limited technical information collected automatically.
          </p>
          <p>
            <strong>Information you provide.</strong> When you email us at{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a>, we collect
            your email address, any name or other details you include, and the
            content of your message. When you book a technical evaluation
            through Calendly, Calendly collects the information you submit on
            that booking form (typically your name, email address, and meeting
            details) and shares with us what is needed to hold the meeting.
          </p>
          <p>
            <strong>Policy evaluator.</strong> The public policy evaluator on
            this website sends the selected demo scenario and proposal details
            to our playground API at{' '}
            <code>api.agentguard.tech</code> so that a policy decision can be
            returned. The evaluator does not execute the listed tools. Requests
            to that API may include a session identifier and the proposal
            payload, and our hosting provider may log the request.
          </p>
          <p>
            <strong>Hosted API signup.</strong> The documentation on this
            website describes <code>POST /api/v1/signup</code> on{' '}
            <code>api.agentguard.tech</code>. If you use that endpoint, we
            store the required <code>name</code> field (the docs treat this as
            an agent name) and, if you supply one, your email address, on a
            tenant record, and we issue an API key. If you submit an email
            that already has an account, we use it to identify that account
            and issue a new key. You may omit the email, in which case the
            account is stored without one. The endpoint does not collect an
            organisation field.
          </p>
          <p>
            <strong>Information collected automatically.</strong> The website is
            hosted on Cloudflare. Cloudflare and our hosting configuration may
            log standard request information including IP address, user agent,
            referrer, and request timestamps, for security and operational
            purposes. The website also loads fonts from Google Fonts, which
            may receive your IP address and user agent as part of that
            request.
          </p>
          <p>
            <strong>Cookies.</strong> We set a first-party cookie named{' '}
            <code>ag_theme</code> to remember whether you chose the dark or
            light theme. We do not currently use advertising trackers or
            third-party analytics scripts on the website. If we add analytics
            in the future, we will update this policy and the website to
            reflect that.
          </p>

          <h2>3. How we use your information</h2>
          <p>We use the personal information we collect to:</p>
          <ul>
            <li>
              Respond to your enquiry and continue technical evaluation
              conversations.
            </li>
            <li>Operate the policy evaluator and related website features.</li>
            <li>
              Create or recover a hosted API tenant account and issue an API
              key, if you use the signup endpoint.
            </li>
            <li>Maintain a record of business communications.</li>
            <li>Operate, secure, and improve the website.</li>
            <li>Comply with our legal obligations.</li>
          </ul>
          <p>
            We do not use your personal information for direct marketing
            without your consent, and we do not sell, rent, or trade it.
          </p>

          <h2>4. Sharing your information</h2>
          <p>
            We share personal information only where necessary, and only with
            parties bound to handle it appropriately. The categories of
            recipients include:
          </p>
          <ul>
            <li>
              Service providers we use to run the website and related
              communications — including Cloudflare (hosting and content
              delivery), Google Fonts (font delivery), and Calendly (meeting
              bookings, if you choose to book) — under their respective terms
              and, where applicable, contractual obligations of
              confidentiality and security.
            </li>
            <li>
              Professional advisers such as lawyers, accountants, and
              auditors, where required.
            </li>
            <li>
              Law enforcement, regulators, or other parties when required or
              permitted by law.
            </li>
            <li>
              A successor entity in the event of a corporate transaction such
              as a merger, acquisition, or sale of assets.
            </li>
          </ul>

          <h2>5. Where your information is stored</h2>
          <p>
            We store personal information in standard business systems. Some
            of these are operated by providers located outside Australia.
            Where personal information is transferred or stored outside
            Australia, we take reasonable steps to ensure that it is handled
            in a manner consistent with the Australian Privacy Principles.
          </p>

          <h2>6. How we protect your information</h2>
          <p>
            We use reasonable technical and organisational measures to protect
            personal information from unauthorised access, loss, misuse, or
            alteration. No method of transmission or storage is completely
            secure, and we cannot guarantee absolute security.
          </p>

          <h2>7. How long we keep your information</h2>
          <p>
            We retain personal information for as long as necessary to fulfil
            the purposes for which it was collected, to maintain a reasonable
            record of our business communications, and to comply with legal
            obligations. After that, we either delete it or de-identify it.
          </p>

          <h2>8. Your rights</h2>
          <p>
            You have rights under the Australian Privacy Act 1988, including:
          </p>
          <ul>
            <li>
              The right to ask us what personal information we hold about you,
              and to access it.
            </li>
            <li>
              The right to ask us to correct personal information that is
              inaccurate, out of date, or incomplete.
            </li>
            <li>
              The right to ask us to delete personal information where we are
              no longer required to keep it.
            </li>
            <li>
              The right to make a complaint about our handling of your
              personal information.
            </li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a>. Support is
            by email only. We reply within 1 business day.
          </p>
          <p>
            If you are not satisfied with our response, you may lodge a
            complaint with the Office of the Australian Information
            Commissioner at{' '}
            <a href="https://www.oaic.gov.au">oaic.gov.au</a>.
          </p>

          <h2>9. Children</h2>
          <p>
            The website is not directed to children under 16, and we do not
            knowingly collect personal information from children. If you
            believe a child has provided personal information to us, please
            contact us and we will delete it.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The “Last updated”
            date at the top of the page indicates when it was last revised. We
            will note material changes prominently on the website.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about this policy or our handling of your personal
            information:
          </p>
          <p>
            <a href="mailto:hani@thebot.club">hani@thebot.club</a>
            <br />
            The Bot Club Pty Ltd, Level 27, 101 Collins Street, Melbourne, VIC
            3000, Australia
          </p>
          <p>Support is by email only. We reply within 1 business day.</p>
        </div>
      </div>
    </section>
  );
}
