import type { Product } from "./types";

export function waLink(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = "Olá! Vim pelo site da A Moda Camis e gostaria de atendimento.";

export function productMessage(name: string, size?: string, color?: string) {
  return `Olá! Vim pelo site da A Moda Camis e gostaria de saber mais sobre o produto: ${name}. Tamanho: ${size || "a definir"}. Cor: ${color || "a definir"}.`;
}

export function cartMessage(lines: { product: Pick<Product, "name">; size: string; color: string; qty: number }[]) {
  const items = lines
    .map(
      (l, i) =>
        `Produto ${i + 1}: ${l.product.name}\nTamanho: ${l.size || "a definir"}\nCor: ${l.color || "a definir"}\nQuantidade: ${l.qty}`,
    )
    .join("\n\n");
  return `Olá! Gostaria de realizar um pedido na A Moda Camis.\n\n${items}\n\nGostaria de confirmar a disponibilidade e receber informações para finalizar minha compra.`;
}

export function formatPrice(price: number | null) {
  return price == null ? "Consulte o valor" : price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** "38 ao 46" no estilo das legendas da loja */
export function sizeRange(sizes: string[]) {
  if (!sizes.length) return "Tamanhos sob consulta";
  if (sizes.length === 1) return `Tam. ${sizes[0]}`;
  return `Do ${sizes[0]} ao ${sizes[sizes.length - 1]}`;
}
