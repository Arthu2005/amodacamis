import { ComingSoon } from "@/components/ComingSoon";
import { getProducts } from "@/lib/data";

export const metadata = { title: "Produto" };
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export default function Page() {
  return <ComingSoon eyebrow="Peça" title="Detalhes da peça em breve." />;
}
