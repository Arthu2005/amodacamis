import { ComingSoon } from "@/components/ComingSoon";
import { getCollections } from "@/lib/data";

export const metadata = { title: "Coleção" };
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCollections()).map((c) => ({ slug: c.slug }));
}

export default function Page() {
  return <ComingSoon eyebrow="Coleção" title="Coleção em preparação." />;
}
