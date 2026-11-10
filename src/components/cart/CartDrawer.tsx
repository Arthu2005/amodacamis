"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { cartMessage, formatPrice, waLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

export function CartDrawer({ products, whatsapp }: { products: Product[]; whatsapp: string }) {
  const { lines, isOpen, close, update, remove, count } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const items = lines
    .map((l, index) => ({ ...l, index, product: products.find((p) => p.id === l.productId) }))
    .filter((l): l is typeof l & { product: Product } => Boolean(l.product));

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const message = cartMessage(items);

  return (
    <div aria-hidden={!isOpen} className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sacola de interesse"
        className={`absolute inset-y-0 right-0 flex w-full flex-col bg-porcelain transition-transform duration-700 ease-[var(--ease-editorial)] sm:w-[440px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p className="eyebrow">Sacola de interesse</p>
            <p className="mt-1 font-display text-2xl">{count ? `${count} ${count === 1 ? "peça" : "peças"}` : "Vazia"}</p>
          </div>
          <button ref={closeRef} onClick={close} className="p-2 text-[11px] uppercase tracking-[0.24em] link-underline" tabIndex={isOpen ? 0 : -1}>
            Fechar
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6">
          {!items.length ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-3xl italic">Sua sacola está vazia.</p>
              <p className="mt-3 max-w-[30ch] text-sm text-stone">Escolha suas peças favoritas e envie tudo de uma vez para a nossa equipe pelo WhatsApp.</p>
              <Link href="/vitrine" onClick={close} className="btn-outline mt-8" tabIndex={isOpen ? 0 : -1}>
                Explorar a vitrine
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {items.map((l) => (
                <li key={`${l.productId}-${l.index}`} className="flex gap-4 py-5">
                  <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-linen">
                    <Image src={l.product.images[0].src} alt={l.product.images[0].alt} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-medium">{l.product.name}</p>
                      <p className="shrink-0 text-xs text-stone">{formatPrice(l.product.price)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex flex-col gap-1 text-stone">
                        Tamanho
                        <select
                          value={l.size}
                          onChange={(e) => update(l.index, { size: e.target.value })}
                          className="border border-line bg-transparent px-2 py-1.5 text-ink"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <option value="">A definir</option>
                          {l.product.sizes.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </label>
                      <label className="flex flex-col gap-1 text-stone">
                        Cor
                        <select
                          value={l.color}
                          onChange={(e) => update(l.index, { color: e.target.value })}
                          className="border border-line bg-transparent px-2 py-1.5 text-ink"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <option value="">A definir</option>
                          {l.product.colors.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-line text-sm">
                        <button aria-label="Diminuir" className="px-3 py-1" onClick={() => (l.qty > 1 ? update(l.index, { qty: l.qty - 1 }) : remove(l.index))} tabIndex={isOpen ? 0 : -1}>−</button>
                        <span className="w-6 text-center">{l.qty}</span>
                        <button aria-label="Aumentar" className="px-3 py-1" onClick={() => update(l.index, { qty: Math.min(10, l.qty + 1) })} tabIndex={isOpen ? 0 : -1}>+</button>
                      </div>
                      <button onClick={() => remove(l.index)} className="text-[11px] uppercase tracking-[0.2em] text-stone link-underline" tabIndex={isOpen ? 0 : -1}>
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-line bg-linen/60 px-6 py-5">
            <a href={waLink(whatsapp, message)} target="_blank" rel="noopener" className="btn-wa w-full" tabIndex={isOpen ? 0 : -1}>
              Enviar pedido pelo WhatsApp
            </a>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-stone">
              Sem pagamento no site. Nossa equipe confirma disponibilidade, valores e entrega com você.
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}
