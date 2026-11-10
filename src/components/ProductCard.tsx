import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, sizeRange } from "@/lib/whatsapp";

export function ProductCard({ product, priority = false, sizes = "(min-width: 1024px) 25vw, 70vw" }: { product: Product; priority?: boolean; sizes?: string }) {
  const [a, b] = product.images;
  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-linen">
        <Image
          src={a.src}
          alt={a.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-all duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
        />
        {b && (
          <Image
            src={b.src}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {product.isNew && <span className="seal bg-porcelain/90 border-transparent text-ink">Novidade</span>}
          {product.availability === "esgotado" && <span className="seal bg-ink text-porcelain border-transparent">Esgotado</span>}
        </div>
        <span className="absolute inset-x-3 bottom-3 translate-y-2 bg-porcelain/95 py-3 text-center text-[10px] uppercase tracking-[0.26em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Ver detalhes
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[15px] leading-snug">{product.name}</h3>
          <p className="mt-1 text-xs text-stone">{sizeRange(product.sizes)}</p>
        </div>
        <p className={`shrink-0 text-[13px] ${product.price == null ? "italic text-stone font-display" : "font-medium"}`}>{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
