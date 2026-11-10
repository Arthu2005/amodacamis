export type Availability = "disponivel" | "sob-consulta" | "esgotado";

export interface ProductImage {
  src: string;
  alt: string;
  /** Origem da foto, para controle de direitos de uso */
  credit?: "loja" | "campanha";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Marca o nome como provisório (ainda não confirmado pela loja) */
  nameToConfirm?: boolean;
  category: string;
  subcategory?: string;
  description: string;
  /** Preço em reais; null = "Consulte o valor" */
  price: number | null;
  compareAtPrice?: number | null;
  sizes: string[];
  colors: string[];
  availability: Availability;
  images: ProductImage[];
  collectionIds: string[];
  isNew: boolean;
  isFeatured: boolean;
  brand?: string;
  instagramUrl?: string;
  publishedAt: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  /** Texto de apresentação; vazio = a loja ainda vai preencher */
  intro: string;
  cover: ProductImage | null;
  /** Capa escolhida provisoriamente pelo desenvolvimento */
  coverIsProvisional?: boolean;
  order: number;
}

export interface OpeningHours {
  label: string;
  hours: string;
}

export interface SiteSettings {
  storeName: string;
  shortName: string;
  tagline: string;
  whatsapp: string; // apenas dígitos com DDI
  whatsappDisplay: string;
  instagram: string;
  city: string;
  address: string; // vazio até a loja informar
  mapsQuery: string;
  hours: OpeningHours[];
  /** Texto institucional; vazio = a loja ainda vai preencher */
  story: string;
  values: string[];
}

export interface InstagramPost {
  id: string;
  url: string;
  image: ProductImage;
  date: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    titleEmphasis: string;
    subtitle: string;
    image: ProductImage;
    secondaryImage: ProductImage;
  };
  featuredProductId: string;
  editorial: { title: string; text: string; images: ProductImage[] };
  sections: string[];
}

export interface CartLine {
  productId: string;
  size: string;
  color: string;
  qty: number;
}
