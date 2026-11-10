import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getCollections, getProducts } from "@/lib/data";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);
  const pages = ["", "/vitrine", "/colecoes", "/sobre", "/contato"].map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const }));
  return [
    ...pages,
    ...collections.map((c) => ({ url: `${base}/colecoes/${c.slug}` })),
    ...products.map((p) => ({ url: `${base}/produto/${p.slug}`, lastModified: p.publishedAt })),
  ];
}
