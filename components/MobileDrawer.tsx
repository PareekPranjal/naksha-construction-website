"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useSiteShell } from "@/lib/site-context";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { navbar, siteSettings } = useSiteShell();
  const NAV = navbar.items;
  const cta = navbar.cta;
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-paper">
      <div className="flex items-center justify-between border-b border-rule-ink px-4 py-4">
        <Wordmark />
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="rounded-full p-2 hover:bg-ink/5"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {NAV.map((n, i) => (
            <li key={n.href} className="border-b border-rule-ink">
              {n.children ? (
                <>
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="flex w-full items-center justify-between py-4 text-left text-h3 serif"
                  >
                    {n.label}
                    <ChevronDown
                      className={cn("h-5 w-5 transition-transform", openIdx === i && "rotate-180")}
                    />
                  </button>
                  {openIdx === i && (
                    <ul className="pb-4">
                      <li>
                        <Link
                          href={n.href}
                          onClick={onClose}
                          className="block py-2 text-body text-accent"
                        >
                          {n.label} overview
                        </Link>
                      </li>
                      {n.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={onClose}
                            className="block py-2 text-body text-concrete-text"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={n.href}
                  onClick={onClose}
                  className="block py-4 text-h3 serif"
                >
                  {n.label}
                </Link>
              )}
            </li>
          ))}
          <li className="border-b border-rule-ink">
            <Link href="/contact" onClick={onClose} className="block py-4 text-h3 serif">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="border-t border-rule-ink px-4 py-6">
        <Link
          href={cta.href}
          onClick={onClose}
          className="inline-flex w-full items-center justify-center rounded-card bg-ink px-6 py-3 text-button text-paper"
        >
          {cta.label}
        </Link>
        <p className="mt-4 text-body-sm text-concrete-text">
          {siteSettings.address.line1}, {siteSettings.address.line2}
        </p>
      </div>
    </div>
  );
}
