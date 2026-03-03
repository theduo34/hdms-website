import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/portal",
          "/api/",
          "/_next/",
          "/admin",
        ],
      },
    ],
    sitemap: "https://www.hdm.edu.gh/sitemap.xml",
    host: "https://www.hdm.edu.gh",
  };
}