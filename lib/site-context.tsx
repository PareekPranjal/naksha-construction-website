"use client";

import { createContext, useContext } from "react";
import type { SiteShell } from "./cms-server";

const SiteShellContext = createContext<SiteShell | null>(null);

export function SiteShellProvider({ value, children }: { value: SiteShell; children: React.ReactNode }) {
  return <SiteShellContext.Provider value={value}>{children}</SiteShellContext.Provider>;
}

export function useSiteShell(): SiteShell {
  const ctx = useContext(SiteShellContext);
  if (!ctx) throw new Error("useSiteShell called outside SiteShellProvider");
  return ctx;
}
