"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useSiteShell } from "@/lib/site-context";
import { Wordmark } from "./Wordmark";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { cn } from "@/lib/utils";

type Props = {
  /**
   * If true, header starts transparent over the hero on the home page,
   * solidifying on scroll.
   */
  transparentOverHero?: boolean;
};

export function Header({ transparentOverHero = false }: Props) {
  const { navbar } = useSiteShell();
  const NAV = navbar.items;
  const cta = navbar.cta;
  const pathname = usePathname() || "/";
  const isActive = (href: string, children?: { href: string }[]): boolean => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    if (pathname === href || pathname.startsWith(href + "/")) return true;
    return Array.isArray(children) && children.some((c) => c.href && (pathname === c.href || pathname.startsWith(c.href + "/")));
  };
  const [scrolled, setScrolled] = useState(false);
  const [menuIdx, setMenuIdx] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const solid = !transparentOverHero || scrolled;
  const variant = solid ? "ink" : "paper";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-200",
          solid
            ? "border-b border-rule-ink bg-paper/95 backdrop-blur"
            : "border-b border-transparent bg-transparent",
        )}
        onMouseLeave={() => setMenuIdx(null)}
      >
        <div className="wrap">
          <div className={cn("flex items-center justify-between", solid ? "h-[64px] md:h-[72px]" : "h-[72px] md:h-[88px]")}>
            <Wordmark variant={variant as "ink" | "paper"} />

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((n, i) => {
                const active = isActive(n.href, n.children);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onMouseEnter={() => setMenuIdx(n.children ? i : null)}
                    onFocus={() => setMenuIdx(n.children ? i : null)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-card px-3 py-2 text-body-sm font-medium transition-colors",
                      active
                        ? "text-accent after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent"
                        : solid
                          ? "text-ink hover:text-accent"
                          : "text-paper hover:text-accent",
                    )}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={cta.href}
                className={cn(
                  "hidden rounded-card border px-4 py-2 text-body-sm font-medium transition-colors lg:inline-flex",
                  solid
                    ? "border-ink text-ink hover:bg-ink hover:text-paper"
                    : "border-paper text-paper hover:bg-paper hover:text-ink",
                )}
              >
                {cta.label}
              </Link>
              <button
                aria-label="Open menu"
                onClick={() => setDrawerOpen(true)}
                className={cn(
                  "rounded-full p-2 transition-colors lg:hidden",
                  solid ? "text-ink hover:bg-ink/5" : "text-paper hover:bg-paper/10",
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        <MegaMenu open={menuIdx !== null} activeIndex={menuIdx} onClose={() => setMenuIdx(null)} />
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
