import type { NextConfig } from "next";

const githubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

const nextConfig: NextConfig = githubPages
  ? {
      output: "export",
      basePath: "/Portfolio",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
