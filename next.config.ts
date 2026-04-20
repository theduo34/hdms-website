import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "xvukypycqyfhjicearrp.supabase.co";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
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
      {
        protocol: "https",
        hostname: supabaseHostname,
        pathname: "/storage/v1/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    formats: ["image/webp"],
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
