import type { NextConfig } from "next";

/**
 * GitHub Pages (project site) serves the app from /<repo-name>/.
 * The deploy workflow sets NEXT_PUBLIC_BASE_PATH automatically.
 * For a user/organization site (<user>.github.io) leave it empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  devIndicators: false,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
