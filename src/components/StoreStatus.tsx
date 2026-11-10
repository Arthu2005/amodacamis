"use client";

import { useEffect, useState } from "react";

/** Mostra "Aberta agora" com base no horário de Brasília (seg–sex 10–19h, sáb 9h30–13h). */
export function StoreStatus() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    const d = now.getDay();
    const m = now.getHours() * 60 + now.getMinutes();
    const [o, c] = d === 0 ? [0, 0] : d === 6 ? [570, 780] : [600, 1140];
    setOpen(m >= o && m < c);
  }, []);
  if (open === null) return null;
  return (
    <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em]">
      <span className="relative flex h-2 w-2">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-60" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-whatsapp" : "bg-stone"}`} />
      </span>
      {open ? "Aberta agora" : "Fechada agora · atendimento pelo WhatsApp"}
    </p>
  );
}
