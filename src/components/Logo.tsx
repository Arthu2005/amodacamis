/**
 * Versão tipográfica provisória do logo, inspirada na moldura do logo original do Instagram.
 * Substituir por <Image src="/brand/logo.svg"> quando a loja enviar o arquivo vetorial.
 */
export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${light ? "text-porcelain" : "text-ink"} ${className}`}>
      <span className="text-[8px] font-medium uppercase tracking-[0.5em] pl-[0.5em]">A Moda</span>
      <span className="mt-1 border border-current px-3 pb-1 pt-1.5 font-display text-[22px] tracking-[0.22em] pl-[calc(0.75rem+0.22em)] md:text-[26px]">
        CAMIS
      </span>
    </span>
  );
}
