import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        //domain is for dev only
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dmd0h8mzp/**",
      },
      {
        protocol: "https",
        hostname: "light-cat-97ad52f04d.media.strapiapp.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"], // 👈 serve modern formats automatically
  }
};

export default nextConfig;
