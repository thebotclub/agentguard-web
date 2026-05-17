import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who builds AgentGuard, why we built it, and where it sits in the AU/APAC AI governance landscape.',
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <span className="eyebrow plain">About</span>
        <h1 style={{ marginTop: 14 }}>Built by operators, not analysts.</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          AgentGuard is the runtime governance layer we needed for our own
          OpenClaw fleet, then turned into a product because every
          APRA-regulated team we showed it to had the same problem.
        </p>

        <div className="prose" style={{ marginTop: 48 }}>
          <h2>The Bot Club</h2>
          <p>
            AgentGuard is built by{' '}
            <strong>The Bot Club Pty Ltd</strong> — an Australian company
            (ABN 99 695 980 226) that operates a production fleet of 18 AI
            agents on the OpenClaw framework, across three Mac minis in
            Sydney.
          </p>
          <p>
            The Bot Club ships{' '}
            <a href="https://tribunal.dev">Tribunal</a> for coding-agent
            governance (Claude Code, Cursor, Copilot, Codex), AgentGuard for
            production-agent governance (OpenClaw, LangChain, CrewAI, OpenAI
            Assistants, AutoGen, MCP), and{' '}
            <a href="https://evidencely.ai">Evidencely</a> for AI-powered
            accounting automation.
          </p>

          <h2>Why this exists</h2>
          <p>
            In late 2025 we put our first non-trivial agent into production
            inside our accounting workflow and immediately hit the same wall
            every AU fintech team is hitting: we had no runtime control plane,
            no policy enforcement, no tamper-evident audit trail, and no
            evidence we could hand to a regulator.
          </p>
          <p>
            We looked at the funded incumbents (Lakera, Prompt Security,
            Lasso, Cisco AI Defense). Every one of them was American or
            European, sold top-down to F500s, and had no APRA mappings, no AU
            data residency, no support model that worked across timezones.
          </p>
          <p>
            On 1 May 2026,{' '}
            <a href="https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai">
              APRA wrote to industry
            </a>{' '}
            confirming the regulator has the same view we do — AU governance
            is failing to keep pace. CPS 230 has been binding since July
            2025. The EU AI Act enforcement window opens 2 August 2026.
          </p>
          <p>
            We built AgentGuard for the buyer that gap leaves stranded: the
            CISO and Head of Risk at an AU mid-market neobank, BNPL,
            mortgage tech or super fund, who can't ship the next AI feature
            until they have an answer the board accepts.
          </p>

          <h2>Where we are</h2>
          <ul>
            <li>
              <strong>v0.11.0</strong> — runtime engine, hash-chained audit
              log, kill switch, evidence-pack generator (CPS 230, EU AI Act,
              ISO 42001, SOC 2 mappings), native OpenClaw / LangChain /
              CrewAI / OpenAI / AutoGen / MCP integrations.
            </li>
            <li>
              Live SDKs on{' '}
              <a href="https://www.npmjs.com/package/@the-bot-club/agentguard">
                npm
              </a>{' '}
              and{' '}
              <a href="https://pypi.org/project/agentguard-tech/">PyPI</a>{' '}
              under{' '}
              <a href="https://github.com/thebotclub/agentguard-core/blob/main/LICENSE">
                BSL 1.1
              </a>
              .
            </li>
            <li>
              Customer zero: The Bot Club's own 18-agent OpenClaw fleet runs
              under AgentGuard from week 5. Real production, real evidence
              pack, signed and Bitcoin-anchored.
            </li>
          </ul>

          <h2>Working with us</h2>
          <p>
            We're taking on a small number of design partners through 2026 —
            three AU regulated fintechs at 50% off the Compliance tier for 12
            months, in exchange for a case study and intros to peers. If
            you're racing the August deadline,{' '}
            <a href="https://calendly.com/hani-thebot/30min">
              book a 30-minute CPS 230 readiness review
            </a>
            . We'll walk through your agent inventory against the standard,
            flag the gaps, and tell you honestly whether AgentGuard fits.
          </p>

          <h2>Who's writing this</h2>
          <p>
            <strong>Hani Koshaji</strong> — founder, The Bot Club. Twenty
            years in payments, accounting, and SaaS infrastructure across the
            UK, GCC and Australia. Most recently building Evidencely
            (AI-powered accounting). Reach me at{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a> or on{' '}
            <a href="https://www.linkedin.com/in/hanikoshaji">LinkedIn</a>.
          </p>
        </div>

        <div
          style={{
            marginTop: 56,
            padding: '28px',
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            borderRadius: 14,
          }}
        >
          <h3 style={{ marginTop: 0 }}>The Bot Club Pty Ltd</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>
            ABN 99 695 980 226 · Sydney, Australia ·{' '}
            <a href="mailto:hani@thebot.club">hani@thebot.club</a>
          </p>
        </div>
      </div>
    </section>
  );
}
