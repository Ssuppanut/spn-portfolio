import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/spn-portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    // GitHub Pages can't run the Next.js image optimisation server
    unoptimized: true,
  },
  env: {
    // expose to client components so they can prefix public-folder image paths
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
