// Client for the AgentGuard playground API. Static-export safe — all browser-side fetches.
export const PLAYGROUND_API_BASE = 'https://api.agentguard.tech/api/v1/playground';

export type Decision = 'allow' | 'block' | 'monitor' | 'require_approval';

export interface ScenarioAction {
  tool: string;
  params: Record<string, unknown>;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  actions: ScenarioAction[];
}

export interface PolicyRuleSummary {
  id: string;
  description: string;
  action: Decision;
  severity: string;
}

export interface Policy {
  id: string;
  name: string;
  description?: string;
  version?: string;
  default?: Decision;
  rules: unknown[];
}

export interface SessionInfo {
  sessionId: string;
  policy?: {
    id: string;
    name: string;
    ruleCount: number;
    default: Decision;
    rules: PolicyRuleSummary[];
  };
}

export interface EvaluateResponse {
  sessionId: string;
  decision: {
    result: Decision;
    matchedRuleId: string | null;
    monitorRuleIds: string[];
    riskScore: number;
    reason: string;
    evaluatedAt: string;
    durationMs: number;
  };
}

export interface AuditEvent {
  seq: number;
  timestamp: string;
  tool: string;
  params: Record<string, unknown>;
  decision: Decision;
  matchedRuleId: string | null;
  monitorRuleIds: string[];
  riskScore: number;
  reason: string;
  durationMs: number;
}

async function jget<T>(path: string): Promise<T> {
  const res = await fetch(`${PLAYGROUND_API_BASE}${path}`, { method: 'GET' });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

async function jpost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${PLAYGROUND_API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getScenarios(): Promise<Scenario[]> {
  const data = await jget<{ scenarios: Scenario[] }>('/scenarios');
  return data.scenarios;
}

export async function getPolicy(): Promise<Policy> {
  const data = await jget<{ policy: Policy }>('/policy');
  return data.policy;
}

export async function createSession(): Promise<SessionInfo> {
  return jpost<SessionInfo>('/session', {});
}

export async function evaluate(
  sessionId: string,
  tool: string,
  params: Record<string, unknown>,
): Promise<EvaluateResponse> {
  return jpost<EvaluateResponse>('/evaluate', { sessionId, tool, params });
}

export async function getAudit(sessionId: string): Promise<{ events: AuditEvent[] }> {
  return jget<{ events: AuditEvent[] }>(`/audit/${sessionId}`);
}

export function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
