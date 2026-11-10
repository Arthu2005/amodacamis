import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ProductOptions } from "@/components/ProductOptions";
import { Reveal } from "@/components/Reveal";
import { StoreStatus } from "@/components/StoreStatus";
import { WaIcon } from "@/components/WhatsAppFloat";
import { getCollections, getHome, getInstagramPosts, getProducts, getSettings } from "@/lib/data";
import { formatPrice, generalMessage, sizeRange, waLink } from "@/lib/whatsapp";

export default async function HomePage() {
  const [home, products, collections, settings, posts] = await Promise.all([
    getHome(),
    getProducts(),
    getCollections(),
    getSettings(),
    getInstagramPosts(),
  ]);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const featured = products.find((p) => p.id === home.featuredProductId) ?? products.find((p) => p.isFeatured) ?? products[0];
  const marquee = ["Do PP ao G1", `Loja física em ${settings.city}`, "Atendimento pelo WhatsApp", ...settings.hours.slice(0, 2).map((h) => `${h.label} ${h.hours}`)];

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative md:container-x md:grid md:grid-cols-12 md:gap-10 md:pb-10">
        <div className="relative h-[calc(100svh-5rem)] min-h-[560px] overflow-hidden md:order-2 md:col-span-7 md:h-[calc(100svh-8.5rem)] md:min-h-[640px]">
          <Image
            src={home.hero.image.src}
            alt={home.hero.image.alt}
            fill
            priority
            sizes="(min-width: 768px) 58vw, 100vw"
            className="kenburns object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 via-55% to-transparent md:hidden" />
          <figure className="absolute bottom-8 left-8 hidden w-[30%] max-w-[260px] lg:block">
            <div className="relative aspect-[3/4] overflow-hidden border-[6px] border-porcelain shadow-[0_30px_60px_-30px_rgba(23,20,18,0.5)]">
              <Image src={home.hero.secondaryImage.src} alt={home.hero.secondaryImage.alt} fill sizes="260px" className="object-cover" />
            </div>
          </figure>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-porcelain md:static md:order-1 md:col-span-5 md:flex md:flex-col md:justify-center md:px-0 md:pb-0 md:text-ink">
          <p className="eyebrow mb-6 !text-current opacity-80 md:!text-stone md:opacity-100">{home.hero.eyebrow}</p>
          <h1 className="display text-[clamp(2.9rem,4.6vw,5.4rem)]">
            {home.hero.title}
            <br />
            <em className="text-peach md:text-peach-deep">
              {home.hero.titleEmphasis.split(/(\d+)/).map((part, i) => (/\d/.test(part) ? <span key={i} className="num">{part}</span> : part))}
            </em>
          </h1>
          <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed opacity-90 md:mt-8 md:text-stone md:opacity-100">{home.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6 md:mt-10">
            <Link href="/vitrine" className="btn bg-porcelain text-ink hover:bg-peach md:bg-ink md:text-porcelain md:hover:bg-peach-deep">Explorar coleção</Link>
            <a href={waLink(settings.whatsapp, generalMessage)} target="_blank" rel="noopener" className="link-underline text-[11px] uppercase tracking-[0.24em]">
              Falar com a loja
            </a>
          </div>
        </div>
      </section>

      {/* ───────────── FAIXA ───────────── */}
      <div className="overflow-hidden border-y border-line py-4" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap text-[11px] uppercase tracking-[0.3em] text-stone">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="h-1 w-1 rotate-45 bg-gold" />
            </span>
          ))}
        </div>
      </div>

      {/* ───────────── NOVIDADES ───────────── */}
      <section id="novidades" className="py-24 md:py-36">
        <div className="container-x">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4">Novidades</p>
              <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)]">
                Recém-chegadas <em className="text-peach-deep">na Camis</em>
              </h2>
            </div>
            <Link href="/vitrine" className="link-underline self-start text-[11px] uppercase tracking-[0.24em] md:self-end">
              Ver toda a vitrine
            </Link>
          </Reveal>
        </div>
        <div className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:container-x md:grid md:gap-8 md:overflow-visible ${newArrivals.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-auto">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── COLEÇÕES ───────────── */}
      <section className="bg-linen py-24 md:py-36">
        <div className="container-x">
          <Reveal className="mb-14 max-w-2xl md:mb-20">
            <p className="eyebrow mb-4">Coleções</p>
            <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)]">
              Cada estação, <em className="text-peach-deep">uma história.</em>
            </h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {collections.map((c, i) => (
              <Reveal key={c.id} delay={i * 120} className={i === 1 ? "md:mt-24" : i === 2 ? "md:mt-12" : ""}>
                <Link href={`/colecoes/${c.slug}`} className="group block">
                  <div className="img-zoom relative aspect-[4/5] overflow-hidden bg-porcelain">
                    {c.cover && <Image src={c.cover.src} alt={c.cover.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 text-porcelain">
                      <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">Nº {String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 font-display text-4xl">{c.name}</h3>
                    </div>
                  </div>
                  <p className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.24em]">
                    <span className="link-underline">Ver coleção</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── EM DESTAQUE ───────────── */}
      {featured && (
        <section className="py-24 md:py-36">
          <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-10">
            <Reveal className="relative md:col-span-7">
              <div className="grid grid-cols-6 gap-3 md:gap-5">
                <div className="img-zoom relative col-span-4 aspect-[3/4] overflow-hidden bg-linen">
                  <Image src={featured.images[0].src} alt={featured.images[0].alt} fill sizes="(min-width: 768px) 40vw, 66vw" className="object-cover" />
                </div>
                {featured.images[1] && (
                  <div className="img-zoom relative col-span-2 mt-[40%] aspect-[3/4] self-start overflow-hidden bg-linen">
                    <Image src={featured.images[1].src} alt={featured.images[1].alt} fill sizes="(min-width: 768px) 20vw, 33vw" className="object-cover" />
                  </div>
                )}
              </div>
            </Reveal>
            <Reveal delay={150} className="md:col-span-5 md:pl-6">
              <span className="seal text-peach-deep">Em destaque</span>
              <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.8rem)]">{featured.name}</h2>
              <div className="mt-5 flex items-baseline gap-4 text-sm">
                <span className={featured.price == null ? "font-display text-lg italic" : "text-lg font-medium"}>{formatPrice(featured.price)}</span>
                <span className="text-stone">{sizeRange(featured.sizes)}</span>
              </div>
              <p className="mt-6 max-w-[44ch] leading-relaxed text-stone">{featured.description}</p>
              <div className="mt-10">
                <ProductOptions product={featured} whatsapp={settings.whatsapp} />
              </div>
              <Link href={`/produto/${featured.slug}`} className="link-underline mt-8 inline-block text-[11px] uppercase tracking-[0.24em]">
                Ver todos os detalhes
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ───────────── EDITORIAL ───────────── */}
      <section id="editorial" className="relative overflow-hidden bg-ink py-24 text-porcelain md:py-40">
        <div className="container-x">
          <Reveal className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="eyebrow mb-4 !text-peach">Editorial</p>
              <h2 className="display text-[clamp(3rem,8vw,8rem)]">
                {home.editorial.title.split(" ").slice(0, -1).join(" ")} <em className="text-peach">{home.editorial.title.split(" ").slice(-1)}</em>
              </h2>
            </div>
            <p className="max-w-[40ch] self-end leading-relaxed text-porcelain/70 md:col-span-4 md:col-start-9">{home.editorial.text}</p>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-12 md:gap-6">
            {home.editorial.images.map((img, i) => (
              <Reveal
                key={img.src}
                delay={i * 140}
                as="figure"
                className={
                  i === 0
                    ? "col-span-2 md:col-span-5"
                    : i === 1
                      ? "md:col-span-4 md:mt-40"
                      : "md:col-span-3 md:mt-16"
                }
              >
                <div className="img-zoom relative aspect-[3/4] overflow-hidden bg-porcelain/5">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 40vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-[10px] uppercase tracking-[0.26em] text-porcelain/50">
                  {String(i + 1).padStart(2, "0")} — {img.alt.replace(/ vestido na loja Camis.*/, "")}
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── HISTÓRIA ───────────── */}
      <section className="py-24 md:py-36">
        <div className="container-x grid items-center gap-12 md:grid-cols-12">
          <Reveal className="relative md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-linen">
              <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/media/instagram/tule-loja.jpg`} alt="Interior da loja Camis, com araras de roupas em tons pastel" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
            <span className="absolute -bottom-5 right-5 bg-peach px-5 py-3 text-[10px] uppercase tracking-[0.3em]">{settings.city}</span>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6 md:col-start-7">
            <p className="eyebrow mb-4">A Moda Camis</p>
            <h2 className="display text-[clamp(2.4rem,4.6vw,4.2rem)]">
              Uma boutique feita <em className="text-peach-deep">para todas as mulheres.</em>
            </h2>
            {settings.story ? (
              <p className="mt-8 max-w-[52ch] whitespace-pre-line leading-relaxed text-stone">{settings.story}</p>
            ) : (
              <p className="mt-8 max-w-[52ch] leading-relaxed text-stone">
                {settings.tagline} Na nossa loja em {settings.city}, cada cliente é recebida com atenção para encontrar a peça certa, no tamanho certo.
              </p>
            )}
            {!settings.story && process.env.NODE_ENV !== "production" && (
              <p className="mt-4 border border-dashed border-peach-deep/40 p-3 text-xs text-peach-deep">
                Para preencher pela loja: história, ano de fundação, trajetória e valores (Painel → Configurações → Institucional).
              </p>
            )}
            <dl className="mt-10 grid grid-cols-3 border-t border-line pt-8">
              <div>
                <dt className="eyebrow">Grade</dt>
                <dd className="mt-2 font-display text-2xl md:text-3xl">PP ao G1</dd>
              </div>
              <div>
                <dt className="eyebrow">Loja física</dt>
                <dd className="mt-2 font-display text-2xl md:text-3xl">Curvelo</dd>
              </div>
              <div>
                <dt className="eyebrow">Comunidade</dt>
                <dd className="mt-2 font-display text-2xl md:text-3xl">7,4 mil</dd>
              </div>
            </dl>
            <Link href="/sobre" className="btn-outline mt-10">Conheça a marca</Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────── LOJA FÍSICA ───────────── */}
      <section className="bg-sky/60 py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-4">Visite a loja</p>
            <h2 className="display text-[clamp(2.4rem,4.6vw,4.2rem)]">
              Venha provar <em className="text-peach-deep">com calma.</em>
            </h2>
            <div className="mt-8"><StoreStatus /></div>
            <ul className="mt-8 border-t border-ink/10">
              {settings.hours.map((h) => (
                <li key={h.label} className="flex justify-between border-b border-ink/10 py-4 text-sm">
                  <span>{h.label}</span>
                  <span className="font-medium">{h.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-stone">{settings.address ? `${settings.address} · ${settings.city}` : settings.city}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.mapsQuery)}`}
                target="_blank"
                rel="noopener"
                className="btn-dark"
              >
                Como chegar
              </a>
              <a href={waLink(settings.whatsapp, generalMessage)} target="_blank" rel="noopener" className="btn-outline">
                <WaIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6 md:col-start-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-porcelain">
              <iframe
                title={`Mapa da loja ${settings.storeName}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.mapsQuery)}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.85] contrast-[0.95]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── INSTAGRAM ───────────── */}
      <section className="py-24 md:py-36">
        <div className="container-x">
          <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4">No Instagram</p>
              <a href={`https://www.instagram.com/${settings.instagram}/`} target="_blank" rel="noopener" className="display block text-[clamp(2.4rem,6vw,5.5rem)] hover:text-peach-deep transition-colors duration-500">
                @{settings.instagram}
              </a>
            </div>
            <a href={`https://www.instagram.com/${settings.instagram}/`} target="_blank" rel="noopener" className="btn-outline">
              Seguir no Instagram
            </a>
          </Reveal>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 70}>
                <a href={post.url} target="_blank" rel="noopener" className="group relative block aspect-[3/4] overflow-hidden bg-linen" aria-label={`Ver no Instagram: ${post.image.alt}`}>
                  <Image src={post.image.src} alt={post.image.alt} fill sizes="(min-width: 768px) 16vw, 50vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                  <span className="absolute inset-0 grid place-items-center bg-ink/40 text-[10px] uppercase tracking-[0.3em] text-porcelain opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Ver post
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
