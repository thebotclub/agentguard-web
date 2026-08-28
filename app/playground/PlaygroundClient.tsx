'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createSession,
  delay,
  evaluate,
  getPolicy,
  getScenarios,
  type AuditEvent,
  type Decision,
  type Policy,
  type Scenario,
} from '@/lib/playground-client';

type LogRow = {
  seq: number;
  ts: string;
  tool: string;
  params: Record<string, unknown>;
  decision: Decision | 'pending' | 'error';
  matchedRuleId?: string | null;
  reason?: string;
  riskScore?: number;
};

const DECISION_LABEL: Record<Decision, string> = {
  allow: 'allow',
  block: 'block',
  monitor: 'monitor',
  require_approval: 'approval required',
};

function DecisionBadge({ decision }: { decision: LogRow['decision'] }) {
  if (decision === 'pending') return <span className="pg-badge pg-badge-pending">running…</span>;
  if (decision === 'error') return <span className="pg-badge pg-badge-error">error</span>;
  const cls = `pg-badge pg-badge-${decision}`;
  return <span className={cls}>{DECISION_LABEL[decision] ?? decision}</span>;
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour12: false });
  } catch {
    return iso;
  }
}

export default function PlaygroundPage() {
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null);
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<LogRow[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const seqRef = useRef(0);

  // Initial load — scenarios + policy in parallel
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sc, pol] = await Promise.all([getScenarios(), getPolicy()]);
        if (cancelled) return;
        setScenarios(sc);
        setPolicy(pol);
        setActiveId(sc[0]?.id ?? null);
      } catch (e) {
        if (cancelled) return;
        setError('API unavailable, try again in a moment.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const active = useMemo(
    () => scenarios?.find((s) => s.id === activeId) ?? null,
    [scenarios, activeId],
  );

  async function runScenario() {
    if (!active || running) return;
    setRunning(true);
    setError(null);
    setLog([]);
    seqRef.current = 0;
    try {
      const session = await createSession();
      setSessionId(session.sessionId);

      // Pre-fill rows as pending for visual rhythm
      const pending: LogRow[] = active.actions.map((a, i) => ({
        seq: i,
        ts: '',
        tool: a.tool,
        params: a.params,
        decision: 'pending',
      }));
      setLog(pending);

      for (let i = 0; i < active.actions.length; i++) {
        const a = active.actions[i];
        await delay(220);
        try {
          const res = await evaluate(session.sessionId, a.tool, a.params);
          setLog((prev) => {
            const next = [...prev];
            next[i] = {
              seq: i,
              ts: res.decision.evaluatedAt,
              tool: a.tool,
              params: a.params,
              decision: res.decision.result,
              matchedRuleId: res.decision.matchedRuleId,
              reason: res.decision.reason,
              riskScore: res.decision.riskScore,
            };
            return next;
          });
        } catch {
          setLog((prev) => {
            const next = [...prev];
            next[i] = { ...next[i], decision: 'error', reason: 'Evaluation failed' };
            return next;
          });
        }
      }
    } catch {
      setError('API unavailable, try again in a moment.');
    } finally {
      setRunning(false);
    }
  }

  const summary = useMemo(() => {
    let allowed = 0;
    let blocked = 0;
    let escalated = 0;
    let monitored = 0;
    for (const r of log) {
      if (r.decision === 'allow') allowed++;
      else if (r.decision === 'block') blocked++;
      else if (r.decision === 'require_approval') escalated++;
      else if (r.decision === 'monitor') monitored++;
    }
    return { allowed, blocked, escalated, monitored };
  }, [log]);

  const allDone =
    log.length > 0 && log.every((r) => r.decision !== 'pending' && r.decision !== 'error');

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ paddingTop: 72, paddingBottom: 32 }}>
        <div className="container">
          <span className="eyebrow">PUBLIC POLICY EVALUATOR</span>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.2rem)' }}>
            Replay a proposed action against demo policy.
          </h1>
          <p className="hero-sub">
            Pick a scenario, run it, and inspect the API decision. The evaluator
            does not execute the listed tools and is not evidence of an
            executor-owned broker boundary.
          </p>
        </div>
      </section>

      {/* Playground grid */}
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          {error && (
            <div className="pg-toast" role="alert">
              {error}
            </div>
          )}

          <div className="pg-grid">
            {/* LEFT: controls */}
            <div className="pg-col">
              <div className="pg-section-head">
                <span className="eyebrow plain">01 · Scenario</span>
                <h2 style={{ marginTop: 10, fontSize: '1.4rem' }}>
                  Pick a proposal to replay
                </h2>
              </div>

              <div className="pg-scenarios">
                {!scenarios && (
                  <div className="pg-skeleton" aria-hidden>
                    Loading scenarios…
                  </div>
                )}
                {scenarios?.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={`pg-scenario ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveId(s.id)}
                      aria-pressed={isActive}
                    >
                      <div className="pg-scenario-name">{s.name}</div>
                      <div className="pg-scenario-desc">{s.description}</div>
                    </button>
                  );
                })}
              </div>

              {active && (
                <div className="pg-actions-preview">
                  <div className="pg-section-head" style={{ marginTop: 28 }}>
                    <span className="eyebrow plain">02 · Tool calls</span>
                    <h2 style={{ marginTop: 10, fontSize: '1.4rem' }}>
                      What this agent will try
                    </h2>
                  </div>
                  <div className="code-window">
                    <div className="code-window-header">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                      <span style={{ marginLeft: 8 }}>{active.id}.scenario.json</span>
                    </div>
                    <pre>
{active.actions
  .map((a, i) => `${(i + 1).toString().padStart(2, '0')}  ${a.tool}(${JSON.stringify(a.params)})`)
  .join('\n')}
                    </pre>
                  </div>

                  <div className="pg-run-row">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={runScenario}
                      disabled={running || !active}
                    >
                      {running ? 'Running…' : `Run scenario · ${active.actions.length} calls`}
                    </button>
                    <span className="pg-foot-note">
                      This calls the public playground API. It evaluates the proposal but does not execute the tool.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: results */}
            <div className="pg-col">
              <div className="pg-section-head">
                <span className="eyebrow plain">03 · API decision log</span>
                <h2 style={{ marginTop: 10, fontSize: '1.4rem' }}>
                  Policy decisions, in order
                </h2>
              </div>

              <div className="pg-audit">
                {log.length === 0 && (
                  <div className="pg-empty">
                    Pick a scenario and hit <strong>Run</strong>. API decisions will appear here.
                  </div>
                )}
                {log.map((row, i) => (
                  <div className="pg-audit-row" key={i}>
                    <div className="pg-audit-top">
                      <span className="pg-time">
                        {row.ts ? formatTime(row.ts) : '—:—:—'}
                      </span>
                      <span className="pg-tool">{row.tool}</span>
                      <DecisionBadge decision={row.decision} />
                      {typeof row.riskScore === 'number' && (
                        <span className="pg-risk" title="Risk score">
                          risk {row.riskScore}
                        </span>
                      )}
                    </div>
                    {row.matchedRuleId && (
                      <div className="pg-rule">
                        matched <code>{row.matchedRuleId}</code>
                      </div>
                    )}
                    {row.reason && <div className="pg-reason">{row.reason}</div>}
                    <pre className="pg-params">
                      {row.tool}({JSON.stringify(row.params)})
                    </pre>
                  </div>
                ))}
              </div>

              {allDone && (
                <div className="pg-summary">
                  <div>
                    <strong>{summary.allowed}</strong> allowed ·{' '}
                    <strong>{summary.blocked}</strong> blocked ·{' '}
                    <strong>{summary.escalated}</strong> approval required ·{' '}
                    <strong>{summary.monitored}</strong> monitored
                  </div>
                  {sessionId && (
                    <div className="pg-session">
                      session <code>{sessionId.slice(0, 8)}…</code>
                    </div>
                  )}
                </div>
              )}

              <details
                className="pg-policy"
                open={showPolicy}
                onToggle={(e) => setShowPolicy((e.target as HTMLDetailsElement).open)}
              >
                <summary>
                  View the active policy
                  {policy && (
                    <span className="pg-policy-meta">
                      · {policy.rules.length} rules · default {policy.default}
                    </span>
                  )}
                </summary>
                <div className="code-window" style={{ marginTop: 14 }}>
                  <div className="code-window-header">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                    <span style={{ marginLeft: 8 }}>
                      {policy?.id ?? 'policy'}.json
                    </span>
                  </div>
                  <pre>{policy ? JSON.stringify(policy, null, 2) : 'Loading policy…'}</pre>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Below-the-fold CTAs */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="grid-3">
            <div className="card">
              <div className="index">A · Inspect the SDKs</div>
              <h3>Use the exact package names</h3>
              <p>The TypeScript and Python packages are independently versioned compatibility artifacts.</p>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span className="install">
                  <span className="dollar">$</span> npm install @the-bot-club/agentguard
                </span>
                <span className="install">
                  <span className="dollar">$</span> pip install agentguard-tech
                </span>
              </div>
            </div>
            <div className="card">
              <div className="index">B · Technical evaluation</div>
              <h3>Need to test one exact action?</h3>
              <p>Bring the capability, caller identity, and bypass paths. Keep the discussion narrow and evidence-led.</p>
              <div style={{ marginTop: 14 }}>
                <a className="btn btn-primary btn-sm" href="https://calendly.com/hani-thebot/30min">
                  Discuss a technical evaluation
                </a>
              </div>
            </div>
            <div className="card">
              <div className="index">C · Assurance limits</div>
              <h3>Read what is not proven</h3>
              <p>No production, compliance, fleet, or non-bypassability outcome is implied by this evaluator.</p>
              <div style={{ marginTop: 14 }}>
                <Link className="btn btn-secondary btn-sm" href="/compliance">
                  Assurance status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
