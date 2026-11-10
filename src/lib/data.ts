/**
 * Camada de dados única do site.
 * - Com NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY definidos, lê do Supabase.
 * - Sem eles (ou se o banco falhar), usa o conteúdo inicial de ./seed.ts, para o site nunca quebrar.
 */
import "server-only";
import { createClient } from "@supabase/supabase-js";
import * as seed from "./seed";
import type { Collection, HomeContent, InstagramPost, Product, SiteSettings } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

export const isSupabaseConfigured = Boolean(supabase);

type Row = Record<string, unknown>;

function mapProduct(r: Row): Product {
  return {
    id: String(r.id),
    slug: String(r.slug),
    name: String(r.name),
    nameToConfirm: Boolean(r.name_to_confirm),
    category: String(r.category ?? ""),
    subcategory: (r.subcategory as string) ?? undefined,
    description: String(r.description ?? ""),
    price: r.price == null ? null : Number(r.price),
    compareAtPrice: r.compare_at_price == null ? null : Number(r.compare_at_price),
    sizes: (r.sizes as string[]) ?? [],
    colors: (r.colors as string[]) ?? [],
    availability: (r.availability as Product["availability"]) ?? "sob-consulta",
    images: (r.images as Product["images"]) ?? [],
    collectionIds: ((r.product_collections as { collection_id: string }[]) ?? []).map((c) => c.collection_id),
    isNew: Boolean(r.is_new),
    isFeatured: Boolean(r.is_featured),
    brand: (r.brand as string) ?? undefined,
    instagramUrl: (r.instagram_url as string) ?? undefined,
    publishedAt: String(r.published_at ?? ""),
  };
}

function mapCollection(r: Row): Collection {
  return {
    id: String(r.id),
    slug: String(r.slug),
    name: String(r.name),
    intro: String(r.intro ?? ""),
    cover: (r.cover as Collection["cover"]) ?? null,
    coverIsProvisional: Boolean(r.cover_is_provisional),
    order: Number(r.sort_order ?? 0),
  };
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!supabase) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.error("[data] Falha ao ler o Supabase, usando conteúdo local:", err);
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  return safe(async () => {
    const { data, error } = await supabase!
      .from("products")
      .select("*, product_collections(collection_id)")
      .eq("active", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(mapProduct);
  }, [...seed.products].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getCollections(): Promise<Collection[]> {
  return safe(async () => {
    const { data, error } = await supabase!.from("collections").select("*").order("sort_order");
    if (error) throw error;
    return (data ?? []).map(mapCollection);
  }, seed.collections);
}

export async function getSettings(): Promise<SiteSettings> {
  return safe(async () => {
    const { data, error } = await supabase!.from("site_settings").select("data").eq("id", 1).single();
    if (error) throw error;
    return { ...seed.settings, ...(data?.data as Partial<SiteSettings>) };
  }, seed.settings);
}

export async function getHome(): Promise<HomeContent> {
  return safe(async () => {
    const { data, error } = await supabase!.from("home_content").select("data").eq("id", 1).single();
    if (error) throw error;
    return { ...seed.home, ...(data?.data as Partial<HomeContent>) };
  }, seed.home);
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  return safe(async () => {
    const { data, error } = await supabase!.from("instagram_posts").select("*").order("date", { ascending: false }).limit(6);
    if (error) throw error;
    return (data ?? []).map((r: Row) => ({ id: String(r.id), url: String(r.url), date: String(r.date), image: r.image as InstagramPost["image"] }));
  }, seed.instagramPosts);
}
