import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/bg/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/en/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];
}

