"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine } from "@/lib/types";

interface CartCtx {
  lines: CartLine[];
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (line: CartLine) => void;
  update: (index: number, patch: Partial<CartLine>) => void;
  remove: (index: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "camis:sacola";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setLines(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === line.productId && l.size === line.size && l.color === line.color);
      if (i === -1) return [...prev, line];
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.min(10, next[i].qty + line.qty) };
      return next;
    });
  }, []);

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      update: (index, patch) => setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l))),
      remove: (index) => setLines((prev) => prev.filter((_, i) => i !== index)),
      clear: () => setLines([]),
    }),
    [lines, isOpen, add],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
