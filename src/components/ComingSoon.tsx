import Link from "next/link";
import { getSettings } from "@/lib/data";
import { generalMessage, waLink } from "@/lib/whatsapp";

/** Página provisória das etapas seguintes (catálogo, produto, coleções, institucional). */
export async function ComingSoon({ eyebrow, title }: { eyebrow: string; title: string }) {
  const settings = await getSettings();
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-start justify-center py-24">
      <p className="eyebrow mb-6">{eyebrow}</p>
      <h1 className="display max-w-[16ch] text-[clamp(2.8rem,7vw,6rem)]">{title}</h1>
      <p className="mt-6 max-w-[44ch] leading-relaxed text-stone">
        Esta página está em preparação. Enquanto isso, nossa equipe atende você pelo WhatsApp.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href={waLink(settings.whatsapp, generalMessage)} target="_blank" rel="noopener" className="btn-wa">
          Falar no WhatsApp
        </a>
        <Link href="/" className="btn-outline">Voltar ao início</Link>
      </div>
    </section>
  );
}
