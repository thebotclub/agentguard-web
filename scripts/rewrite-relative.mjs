// Post-build: rewrite absolute /_next/ and /favicon paths to relative paths so the
// static export works when served from a sub-path (e.g. preview proxy URLs).
// At staging.agentguard.tech the site lives at the domain root, so these
// rewrites are still valid (relative ↔ absolute resolve to the same target).
import { promises as fs } from 'fs';
import path from 'path';

const OUT = path.resolve('out');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (full.endsWith('.html')) files.push(full);
  }
  return files;
}

function depthFromOut(file) {
  const rel = path.relative(OUT, file);
  const segs = rel.split(path.sep);
  // segs.length-1 = number of directories above file
  return segs.length - 1;
}

function prefixFor(depth) {
  if (depth === 0) return './';
  return '../'.repeat(depth);
}

const files = await walk(OUT);
for (const f of files) {
  const html = await fs.readFile(f, 'utf8');
  const prefix = prefixFor(depthFromOut(f));
  // Replace href="/_next/..." and src="/_next/..." and href="/favicon.svg"
  const out = html
    .replace(/(href|src)="\/_next\//g, `$1="${prefix}_next/`)
    .replace(/(href|src)="\/favicon\.svg"/g, `$1="${prefix}favicon.svg"`)
    // Inline RSC payload and preload manifest reference assets as JSON string
    // like "\"\/_next\/...\"" — rewrite those too so preloads & CSS swap resolve.
    .replace(/\\"\/_next\//g, `\\"${prefix}_next/`)
    .replace(/"\/_next\//g, `"${prefix}_next/`);
  if (out !== html) await fs.writeFile(f, out, 'utf8');
}
console.log(`Rewrote ${files.length} HTML files for relative asset paths.`);
