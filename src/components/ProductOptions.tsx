"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { productMessage, waLink } from "@/lib/whatsapp";
import { useCart } from "./cart/CartProvider";
import { WaIcon } from "./WhatsAppFloat";

/** Seleção de tamanho/cor + consulta no WhatsApp + sacola de interesse. Reutilizado na HOME e na página do produto. */
export function ProductOptions({ product, whatsapp }: { product: Product; whatsapp: string }) {
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [color, setColor] = useState(product.colors.length === 1 ? product.colors[0] : "");
  const [added, setAdded] = useState(false);
  const { add, open } = useCart();
  const soldOut = product.availability === "esgotado";

  const availability = {
    disponivel: "Disponível na loja",
    "sob-consulta": "Disponibilidade sob consulta",
    esgotado: "Esgotado no momento",
  }[product.availability];

  function addToBag() {
    add({ productId: product.id, size, color, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    open();
  }

  return (
    <div className="space-y-7">
      {product.sizes.length > 0 && (
        <fieldset>
          <legend className="eyebrow mb-3">Tamanho {size && <span className="text-ink">· {size}</span>}</legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={`h-11 min-w-11 border px-3 text-sm transition-colors duration-300 ${
                  size === s ? "border-ink bg-ink text-porcelain" : "border-line hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {product.colors.length > 0 && (
        <fieldset>
          <legend className="eyebrow mb-3">Cor</legend>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={color === c}
                onClick={() => setColor(c)}
                className={`border px-4 py-2.5 text-sm transition-colors duration-300 ${
                  color === c ? "border-ink bg-ink text-porcelain" : "border-line hover:border-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <p className="flex items-center gap-2 text-sm text-stone">
        <span className={`h-1.5 w-1.5 rounded-full ${soldOut ? "bg-stone" : product.availability === "disponivel" ? "bg-whatsapp" : "bg-gold"}`} />
        {availability}
      </p>

      <div className="grid gap-3">
        <a href={waLink(whatsapp, productMessage(product.name, size, color))} target="_blank" rel="noopener" className="btn-wa">
          <WaIcon className="h-5 w-5" />
          {soldOut ? "Avise-me quando chegar" : "Consultar e comprar no WhatsApp"}
        </a>
        {!soldOut && (
          <button type="button" onClick={addToBag} className="btn-outline">
            {added ? "Adicionado à sacola ✓" : "Adicionar à sacola de interesse"}
          </button>
        )}
      </div>
    </div>
  );
}
