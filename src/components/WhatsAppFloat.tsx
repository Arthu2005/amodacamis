"use client";

import { useEffect, useState } from "react";
import { generalMessage, waLink } from "@/lib/whatsapp";

export function WaIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.9.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.2-.3-.2-.6-.4z"
      />
    </svg>
  );
}

export function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={waLink(whatsapp, generalMessage)}
      target="_blank"
      rel="noopener"
      aria-label="Falar com a A Moda Camis pelo WhatsApp"
      className={`group fixed bottom-5 right-5 z-50 flex items-center gap-0 rounded-full bg-whatsapp p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(31,168,85,0.55)] transition-all duration-700 hover:gap-3 hover:pr-5 md:bottom-8 md:right-8 ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <WaIcon className="h-7 w-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] uppercase tracking-[0.2em] transition-all duration-700 group-hover:max-w-40">
        Atendimento
      </span>
    </a>
  );
}
