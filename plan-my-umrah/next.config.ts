import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Repo memiliki lockfile lain di folder atas — kunci root tracing ke project ini
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/planner",
        destination: "/plan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
