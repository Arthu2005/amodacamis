import Link from "next/link";
import { Logo } from "./Logo";
import type { SiteSettings } from "@/lib/types";
import { generalMessage, waLink } from "@/lib/whatsapp";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-porcelain">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-8 max-w-[32ch] font-display text-2xl italic leading-snug text-porcelain/90">{settings.tagline}</p>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-porcelain/50">Navegue</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/vitrine" className="link-underline">Vitrine</Link></li>
            <li><Link href="/colecoes" className="link-underline">Coleções</Link></li>
            <li><Link href="/sobre" className="link-underline">A Marca</Link></li>
            <li><Link href="/contato" className="link-underline">Contato</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-porcelain/50">Atendimento</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={waLink(settings.whatsapp, generalMessage)} target="_blank" rel="noopener" className="link-underline">
                WhatsApp {settings.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`https://www.instagram.com/${settings.instagram}/`} target="_blank" rel="noopener" className="link-underline">
                Instagram @{settings.instagram}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-porcelain/50">Loja física</p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-porcelain/80">
            {settings.address && <>{settings.address}<br /></>}
            {settings.city}
          </address>
          <ul className="mt-4 space-y-1 text-sm text-porcelain/80">
            {settings.hours.map((h) => (
              <li key={h.label} className="flex justify-between gap-6 border-b border-porcelain/10 py-1.5">
                <span>{h.label}</span>
                <span>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-porcelain/10 py-6 text-[11px] uppercase tracking-[0.2em] text-porcelain/40 md:flex-row">
        <p>© {year} {settings.storeName}</p>
        <p>Vitrine digital · Pedidos pelo WhatsApp</p>
      </div>
    </footer>
  );
}
