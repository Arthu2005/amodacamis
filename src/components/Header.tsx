"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "./cart/CartProvider";
import { generalMessage, waLink } from "@/lib/whatsapp";

export const NAV = [
  { href: "/vitrine", label: "Vitrine" },
  { href: "/colecoes", label: "Coleções" },
  { href: "/#editorial", label: "Editorial" },
  { href: "/sobre", label: "A Marca" },
  { href: "/contato", label: "Contato" },
];

export function Header({ whatsapp }: { whatsapp: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, open } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled || menu ? "border-b border-line bg-porcelain/90 backdrop-blur-md" : "border-b border-transparent bg-porcelain"
        }`}
      >
        <div className={`container-x grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
          {/* Esquerda */}
          <div className="flex items-center">
            <button
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] lg:hidden"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="menu-mobile"
            >
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 h-px w-6 bg-ink transition-all duration-500 ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-6 bg-ink transition-all duration-500 ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
              <span className="hidden sm:inline">{menu ? "Fechar" : "Menu"}</span>
            </button>
            <nav aria-label="Principal" className="hidden gap-8 lg:flex">
              {NAV.slice(0, 3).map((n) => (
                <Link key={n.href} href={n.href} className="link-underline text-[11px] uppercase tracking-[0.24em]" aria-current={pathname === n.href ? "page" : undefined}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centro */}
          <Link href="/" aria-label="A Moda Camis, página inicial" className="justify-self-center">
            <Logo />
          </Link>

          {/* Direita */}
          <div className="flex items-center justify-end gap-6 lg:gap-8">
            <nav aria-label="Institucional" className="hidden gap-8 lg:flex">
              {NAV.slice(3).map((n) => (
                <Link key={n.href} href={n.href} className="link-underline text-[11px] uppercase tracking-[0.24em]" aria-current={pathname === n.href ? "page" : undefined}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <a
              href={waLink(whatsapp, generalMessage)}
              target="_blank"
              rel="noopener"
              className="hidden border border-ink px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors duration-500 hover:bg-ink hover:text-porcelain md:inline-block"
            >
              Atendimento
            </a>
            <button onClick={open} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em]" aria-label={`Abrir sacola, ${count} ${count === 1 ? "peça" : "peças"}`}>
              <span className="hidden sm:inline link-underline">Sacola</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 sm:hidden" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
                <path d="M9 8V7a3 3 0 0 1 6 0v1" />
              </svg>
              <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] tracking-normal transition-colors ${count ? "bg-ink text-porcelain" : "border border-line text-stone"}`}>
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile em tela cheia */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 top-16 z-40 flex flex-col bg-porcelain px-5 pb-10 pt-8 transition-all duration-700 lg:hidden ${
          menu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Menu" className="flex flex-col">
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenu(false)}
              style={{ transitionDelay: menu ? `${120 + i * 60}ms` : "0ms" }}
              className={`border-b border-line py-5 font-display text-4xl transition-all duration-700 ${menu ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto grid gap-3">
          <a href={waLink(whatsapp, generalMessage)} target="_blank" rel="noopener" className="btn-wa">
            Falar com a Camis
          </a>
          <p className="text-center text-xs text-stone">Seg a sex 10h às 19h · Sáb 9h30 às 13h</p>
        </div>
      </div>
    </>
  );
}
