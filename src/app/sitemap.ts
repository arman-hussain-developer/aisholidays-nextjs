import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/domestic-tours`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/international-tours`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/holidays`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/weddings`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cancellation`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const destinationPages = destinations.map((d) => ({
    url: `${base}/${d.type === "domestic" ? "domestic-tours" : "international-tours"}/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const packagePages = packages.map((p) => ({
    url: `${base}/packages/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...destinationPages, ...packagePages];
}
