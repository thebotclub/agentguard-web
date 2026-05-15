/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Map /docs -> docs.agentguard.tech via a static HTML redirect (see public/docs/index.html)
};
export default nextConfig;
