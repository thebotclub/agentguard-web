import type { Metadata } from 'next';
import PlaygroundClient from './PlaygroundClient';

export const metadata: Metadata = {
  title: 'Policy evaluator — AgentGuard playground',
  description: 'Replay demo proposals against the public policy API. This evaluator does not execute agent tools or prove the broker topology.',
  openGraph: {
    title: 'AgentGuard playground — inspect policy decisions',
    description: 'Public policy-evaluation scenarios with explicit runtime limits.',
    url: 'https://agentguard.tech/playground/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentGuard playground',
    description: 'Inspect public policy-evaluation scenarios and their limits.',
  },
};

export default function Page() {
  return <PlaygroundClient />;
}
