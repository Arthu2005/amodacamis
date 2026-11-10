import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { getProducts, getSettings } from "@/lib/data";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", style: ["normal", "italic"], display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "A Moda Camis | Moda feminina do PP ao G1 em Curvelo/MG",
    template: "%s | A Moda Camis",
  },
  description:
    "Boutique de moda feminina em Curvelo/MG. Vestindo com elegância e modernidade do PP ao G1. Escolha online e finalize pelo WhatsApp.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "A Moda Camis",
    images: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/media/instagram/estampado-1.jpg`, width: 1440, height: 1737 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: "#faf7f3",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, products] = await Promise.all([getSettings(), getProducts()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: settings.storeName,
    description: settings.tagline,
    url: siteUrl,
    telephone: `+${settings.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address || undefined,
      addressLocality: "Curvelo",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    sameAs: [`https://www.instagram.com/${settings.instagram}/`],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:30", closes: "13:00" },
    ],
  };

  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${jost.variable}`}>
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain">
          Pular para o conteúdo
        </a>
        <CartProvider>
          <Header whatsapp={settings.whatsapp} />
          <main id="conteudo">{children}</main>
          <Footer settings={settings} />
          <WhatsAppFloat whatsapp={settings.whatsapp} />
          <CartDrawer products={products} whatsapp={settings.whatsapp} />
        </CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
