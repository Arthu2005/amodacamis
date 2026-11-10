/**
 * Conteúdo inicial, levantado do Instagram público @amodacamis em 10/11/2026.
 * Nada aqui é inventado: o que não foi informado pela loja fica vazio ou marcado como "a confirmar".
 * Quando o Supabase estiver configurado, estes dados passam a vir do banco (ver supabase/seed.sql).
 */
import type { Collection, HomeContent, InstagramPost, Product, SiteSettings } from "./types";

const IG = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/media/instagram`;

export const settings: SiteSettings = {
  storeName: "A Moda Camis",
  shortName: "Camis",
  tagline: "Vestindo com elegância e modernidade do PP ao G1.",
  whatsapp: "5538998908899",
  whatsappDisplay: "(38) 99890-8899",
  instagram: "amodacamis",
  city: "Curvelo/MG",
  address: "",
  mapsQuery: "Camis Roupas e Acessórios, Curvelo - MG",
  hours: [
    { label: "Segunda a sexta", hours: "10h às 19h" },
    { label: "Sábado", hours: "9h30 às 13h" },
    { label: "Domingo", hours: "Fechado" },
  ],
  story: "",
  values: [],
};

export const collections: Collection[] = [
  {
    id: "primavera-2026",
    slug: "primavera-2026",
    name: "Primavera 2026",
    intro: "",
    cover: { src: `${IG}/estampado-1.jpg`, alt: "Vestido longo estampado em azul-marinho, fotografado em estúdio", credit: "campanha" },
    coverIsProvisional: true,
    order: 1,
  },
  {
    id: "resort-2026",
    slug: "resort-2026",
    name: "Resort 2026",
    intro: "",
    cover: { src: `${IG}/azul-1.jpg`, alt: "Vestido azul-claro frente única em cenário mediterrâneo", credit: "campanha" },
    coverIsProvisional: true,
    order: 2,
  },
  {
    id: "celebrar",
    slug: "celebrar",
    name: "Coleção Celebrar",
    intro: "",
    cover: { src: `${IG}/tule-1.jpg`, alt: "Vestido de tule em degradê marrom e azul em um mercado", credit: "campanha" },
    coverIsProvisional: true,
    order: 3,
  },
];

export const products: Product[] = [
  {
    id: "vestido-tule",
    slug: "vestido-tule",
    name: "Vestido Tule",
    category: "Vestidos",
    subcategory: "Longos",
    description: "Vestido Tule maravilhoso! Alças finas, decote degagê e estampa em degradê de marrom e azul.",
    price: null,
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["Degradê marrom e azul"],
    availability: "disponivel",
    images: [
      { src: `${IG}/tule-1.jpg`, alt: "Vestido Tule em degradê marrom e azul, foto de campanha", credit: "campanha" },
      { src: `${IG}/tule-2.jpg`, alt: "Vestido Tule vestido na loja Camis, entre as araras", credit: "loja" },
      { src: `${IG}/tule-loja.jpg`, alt: "Detalhe do Vestido Tule na loja", credit: "loja" },
    ],
    collectionIds: [],
    isNew: true,
    isFeatured: true,
    instagramUrl: "https://www.instagram.com/p/DfVOit_C-SG/",
    publishedAt: "2026-11-04",
  },
  {
    id: "look-jeans-doce-trama",
    slug: "look-jeans-doce-trama",
    name: "Look Jeans Doce Trama",
    category: "Conjuntos",
    subcategory: "Jeans",
    description: "Um look jeans para arrasar! Colete com botões e cinto e saia longa em jeans escuro.",
    price: null,
    sizes: ["34", "36", "38", "40", "42", "44", "46"],
    colors: ["Jeans escuro"],
    availability: "disponivel",
    images: [
      { src: `${IG}/jeans-1.jpg`, alt: "Colete e saia longa jeans, foto de estúdio", credit: "campanha" },
      { src: `${IG}/jeans-2.jpg`, alt: "Look jeans vestido na loja Camis", credit: "loja" },
      { src: `${IG}/jeans-loja.jpg`, alt: "Detalhe do cinto do colete jeans", credit: "loja" },
    ],
    collectionIds: [],
    isNew: true,
    isFeatured: false,
    brand: "Doce Trama",
    instagramUrl: "https://www.instagram.com/reel/DfGAB2OCkH1/",
    publishedAt: "2026-10-29",
  },
  {
    id: "vestido-azul-frente-unica",
    slug: "vestido-azul-frente-unica",
    name: "Vestido Azul Frente Única",
    nameToConfirm: true,
    category: "Vestidos",
    subcategory: "Curtos",
    description: "Vestido azul-claro frente única com babado e lenço assimétrico.",
    price: null,
    sizes: [],
    colors: ["Azul-claro"],
    availability: "sob-consulta",
    images: [
      { src: `${IG}/azul-1.jpg`, alt: "Vestido azul-claro frente única em cenário mediterrâneo", credit: "campanha" },
      { src: `${IG}/azul-loja.jpg`, alt: "Vestido azul-claro vestido na loja Camis", credit: "loja" },
      { src: `${IG}/azul-2.jpg`, alt: "Vestido azul-claro com lenço esvoaçante", credit: "campanha" },
    ],
    collectionIds: [],
    isNew: true,
    isFeatured: false,
    instagramUrl: "https://www.instagram.com/reel/De_zatnCUi0/",
    publishedAt: "2026-10-27",
  },
  {
    id: "vestido-longo-estampado",
    slug: "vestido-longo-estampado",
    name: "Vestido Longo Estampado",
    nameToConfirm: true,
    category: "Vestidos",
    subcategory: "Longos",
    description: "Vestido longo frente única em tule estampado, base azul-marinho com folhagens em areia e verde-oliva.",
    price: null,
    sizes: [],
    colors: ["Azul-marinho estampado"],
    availability: "sob-consulta",
    images: [
      { src: `${IG}/estampado-1.jpg`, alt: "Vestido longo estampado azul-marinho, foto de estúdio", credit: "campanha" },
      { src: `${IG}/estampado-2.jpg`, alt: "Vestido longo estampado vestido na loja Camis", credit: "loja" },
      { src: `${IG}/estampado-3.jpg`, alt: "Costas do vestido longo estampado com amarração", credit: "campanha" },
    ],
    collectionIds: [],
    isNew: false,
    isFeatured: false,
    instagramUrl: "https://www.instagram.com/p/DeuFjgVCxUX/",
    publishedAt: "2026-10-20",
  },
];

export const instagramPosts: InstagramPost[] = [
  { id: "DfVOit_C-SG", url: "https://www.instagram.com/p/DfVOit_C-SG/", date: "2026-11-04", image: { src: `${IG}/tule-2.jpg`, alt: "Vestido Tule na loja" } },
  { id: "DfVOqRjiAsz", url: "https://www.instagram.com/p/DfVOqRjiAsz/", date: "2026-11-04", image: { src: `${IG}/tule-1.jpg`, alt: "Vestido Tule em campanha" } },
  { id: "DfF_v3rifKi", url: "https://www.instagram.com/p/DfF_v3rifKi/", date: "2026-10-29", image: { src: `${IG}/jeans-2.jpg`, alt: "Look jeans na loja" } },
  { id: "De_0h_xCwjk", url: "https://www.instagram.com/p/De_0h_xCwjk/", date: "2026-10-27", image: { src: `${IG}/azul-1.jpg`, alt: "Vestido azul-claro" } },
  { id: "DeuFjgVCxUX", url: "https://www.instagram.com/p/DeuFjgVCxUX/", date: "2026-10-20", image: { src: `${IG}/estampado-2.jpg`, alt: "Vestido estampado na loja" } },
  { id: "DeuFfU7CiY0", url: "https://www.instagram.com/p/DeuFfU7CiY0/", date: "2026-10-20", image: { src: `${IG}/estampado-3.jpg`, alt: "Costas do vestido estampado" } },
];

export const home: HomeContent = {
  hero: {
    eyebrow: "Boutique · Curvelo/MG",
    title: "Elegância e modernidade,",
    titleEmphasis: "do PP ao G1.",
    subtitle: "Escolha suas peças aqui e finalize com a nossa equipe pelo WhatsApp, com o mesmo atendimento da loja.",
    image: { src: `${IG}/estampado-1.jpg`, alt: "Vestido longo estampado azul-marinho, foto de estúdio", credit: "campanha" },
    secondaryImage: { src: `${IG}/azul-2.jpg`, alt: "Vestido azul-claro com lenço esvoaçante", credit: "campanha" },
  },
  featuredProductId: "vestido-tule",
  editorial: {
    title: "Provado na loja",
    text: "Toda novidade passa pelas araras da Camis antes de chegar até você: vestida, ajustada e fotografada aqui mesmo, em Curvelo.",
    images: [
      { src: `${IG}/tule-2.jpg`, alt: "Vestido Tule vestido na loja Camis", credit: "loja" },
      { src: `${IG}/jeans-2.jpg`, alt: "Look jeans vestido na loja Camis", credit: "loja" },
      { src: `${IG}/estampado-2.jpg`, alt: "Vestido estampado vestido na loja Camis", credit: "loja" },
    ],
  },
  sections: ["novidades", "colecoes", "destaque", "editorial", "historia", "loja", "instagram"],
};
