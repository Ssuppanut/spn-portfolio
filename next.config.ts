import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // deployed at https://ssuppanut.github.io/spn-portfolio/
  basePath: "/spn-portfolio",
  images: {
    // GitHub Pages can't run the Next.js image optimisation server
    unoptimized: true,
  },
};

export default nextConfig;
