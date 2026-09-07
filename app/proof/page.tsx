import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Named-action proof',
  description:
    'Current evidence for one GitHub file write through a construction-time stdio wrap. Configured intercept, not capability isolation.',
};

export default function ProofPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <span className="eyebrow plain">Named-action proof</span>
        <h1 style={{ marginTop: 14 }}>One GitHub write, honestly scoped.</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          AgentGuard currently has dated evidence for one named action on a
          same-UID install. That is configured intercept. It is not capability
          isolation, and it is not a firewall result.
        </p>

        <div className="prose" style={{ marginTop: 48 }}>
          <h2>Named action</h2>
          <p>
            Operation <code>github.create_or_update_file</code> against a
            repository file. The broker wraps a construction-time stdio child:
            frozen command, argv, and cwd. The GitHub App installation token is
            minted at spawn and is not in the MCP request.
          </p>
          <ul>
            <li>
              Upstream image{' '}
              <code>ghcr.io/github/github-mcp-server@sha256:46cdbbd810faf6f7aed1745ea04057443f5cb9fcadc15c7308add18cf9a83e33</code>
            </li>
            <li>
              Broker tarball SHA-256{' '}
              <code>70daaae891ad749d8f03a26a7532d20a8b46588c45de37fbc0002823f83bf40d</code>
            </li>
            <li>
              Allow proof on <code>thebotclub/agentguard-web</code> main:{' '}
              <code>named-action-proof-broker.txt</code>, blob{' '}
              <code>ab9d05fceeeee27a253aa8343ca36e55ad3c65c4</code>
            </li>
            <li>
              Deny proof: the same path{' '}
              <code>named-action-proof-deny.txt</code> was not created (GitHub
              404; adapter writes 0; docker not started)
            </li>
            <li>
              Owned OpenClaw fleet: <code>mcp.servers.agentguard-github</code>{' '}
              command is the broker wrap; the unwrapped{' '}
              <code>github-mcp-stdio</code> command was deleted. HTTP{' '}
              <code>autoclaw-github</code> stays off. OpenClaw MCP doctor:{' '}
              <code>agentguard-github: ok</code>.
            </li>
            <li>
              Fleet unwrapped step{' '}
              <code>named-action-proof-fleet-stdio.txt</code> sha{' '}
              <code>575aa0a39c7233534e9f6ede3f3ca56bb87a1d43</code>; after
              replace <code>named-action-proof-fleet-broker.txt</code> sha{' '}
              <code>9da6c5eea1a73901a6db696c2e821703648a2c3c</code>
            </li>
          </ul>

          <h2>Assurance tier actually earned</h2>
          <p>
            <strong>Configured intercept.</strong> Same-UID{' '}
            <code>mcp.servers.*.command</code> replace. The agent can still spawn
            the upstream binary, rewrite config, and use native tools unless
            those are separately denied.
          </p>
          <p>
            Capability isolation is not claimed. There is no dedicated broker
            user, and OpenClaw can still read the same home directory.
          </p>

          <h2>Bypass matrix</h2>
          <ul>
            <li>
              <strong>Same-UID exec / config rewrite.</strong> Bypass of this
              wrap. Not a host-isolation failure because isolation was not
              claimed.
            </li>
            <li>
              <strong>Disabled OpenClaw hook.</strong> Bypass of compatibility
              telemetry only. The named wrap is a stdio command replace, not a
              hook.
            </li>
            <li>
              <strong>Native OpenClaw <code>exec</code>, <code>browser</code>,{' '}
              <code>write</code>.</strong> Uncovered.
            </li>
            <li>
              <strong>HTTP MCP <code>autoclaw-github</code> and{' '}
              <code>autoclaw-productivity</code>.</strong> Uncovered. This wrap
              does not proxy Streamable HTTP.
            </li>
            <li>
              <strong>Host / admin / kernel compromise.</strong> Out of scope.
            </li>
          </ul>

          <h2>What this page does not say</h2>
          <p>
            No regulator outcome, no CPS 230, no EU AI Act conformity, no
            production-proven category claim, and no statement that OpenClaw
            cannot act. The{' '}
            <Link href="/trust">trust page</Link> still describes firewall proof
            as pending.
          </p>
        </div>
      </div>
    </section>
  );
}
