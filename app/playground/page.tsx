import type { Metadata } from 'next';
import PlaygroundClient from './PlaygroundClient';

export const metadata: Metadata = {
  title: 'Live demo — AgentGuard playground',
  description: 'Pick an attack scenario and watch AgentGuard block a rogue agent. Every tool call runs through the live policy engine. No signup.',
  openGraph: {
    title: 'AgentGuard playground — watch a rogue agent get blocked',
    description: 'Live demo of runtime governance for production AI agents.',
    url: 'https://agentguard.tech/playground/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentGuard playground',
    description: 'Live demo of runtime governance for production AI agents.',
  },
};

export default function Page() {
  return <PlaygroundClient />;
}
