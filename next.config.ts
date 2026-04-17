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
      {
        // Supabase Storage — media bucket
        protocol: "https",
        hostname: "xvukypycqyfhjicearrp.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    dangerouslyAllowSVG: true,         // required for local /images/placeholder.svg
    contentDispositionType: "attachment",
    formats: ["image/avif", "image/webp"],
  }
};

export default nextConfig;
