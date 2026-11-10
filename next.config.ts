import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=true gera um site estático (pré-visualização no GitHub Pages).
 * Sem ela, o build é o normal do Next.js (Vercel), com otimização de imagens e painel.
 */
const isStatic = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
  basePath: basePath || undefined,
  images: {
    unoptimized: isStatic,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
  poweredByHeader: false,
};

export default nextConfig;
