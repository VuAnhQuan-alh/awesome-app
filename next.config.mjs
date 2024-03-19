/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
};

export default nextConfig;
