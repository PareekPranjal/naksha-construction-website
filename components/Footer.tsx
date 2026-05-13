"use client";

import Link from "next/link";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useSiteShell } from "@/lib/site-context";
import { Wordmark } from "./Wordmark";
import { NewsletterSignup } from "./NewsletterSignup";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  x: Twitter,
  github: Github,
  email: Mail,
  phone: Phone,
  website: Globe,
};

export function Footer() {
  const { footer, siteSettings: SITE } = useSiteShell();
  // Prefer the new socials array; fall back to the legacy single-key object.
  const socials =
    SITE.socials && SITE.socials.length > 0
      ? SITE.socials
      : SITE.social
        ? Object.entries(SITE.social)
            .filter(([, url]) => url && url !== "#")
            .map(([icon, url]) => ({ icon, url, label: icon }))
        : [];
  return (
    <footer className="bg-ink text-paper">
      <div className="border-b border-rule-paper">
        <div className="wrap py-10 md:py-14">
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div>
              <p className="serif text-h2">{footer.callout.heading}</p>
              {/^<[a-z!\/]/i.test(footer.callout.body ?? "") ? (
                <div
                  className="mt-3 max-w-md text-body text-paper/70 [&_a]:underline [&_p]:mt-3 [&_p:first-child]:mt-0"
                  dangerouslySetInnerHTML={{ __html: footer.callout.body }}
                />
              ) : (
                <p className="mt-3 max-w-md text-body text-paper/70">{footer.callout.body}</p>
              )}
              <Link
                href={footer.callout.ctaHref}
                className="mt-6 inline-flex items-center rounded-card border border-paper/30 px-5 py-3 text-button text-paper hover:border-accent hover:text-accent"
              >
                {footer.callout.ctaLabel} →
              </Link>
            </div>
            <NewsletterSignup className="md:justify-self-end" />
          </div>
        </div>
      </div>

      <div className="wrap py-14 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Wordmark variant="paper" />
            <p className="mt-4 max-w-xs text-body-sm text-paper/70">
              {SITE.tagline}
            </p>
            <address className="mt-6 not-italic text-body-sm text-paper/70">
              {SITE.address.line1}<br />
              {SITE.address.line2}<br />
              {SITE.address.country}
            </address>
            <p className="mt-3 text-body-sm">
              <a className="text-paper hover:text-accent" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                {SITE.phone}
              </a>
            </p>
            <p className="text-body-sm">
              <a className="text-paper hover:text-accent" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {socials.map((s, i) => {
                  const Icon = ICONS[s.icon] ?? Globe;
                  return (
                    <SocialLink
                      key={i}
                      href={s.url || "#"}
                      label={s.label || s.icon}
                    >
                      <Icon className="h-4 w-4" />
                    </SocialLink>
                  );
                })}
              </div>
            )}
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading} className="md:col-span-3">
              <p className="eyebrow text-paper/50">{col.heading}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-body text-paper hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-rule-paper pt-6">
          <div className="flex flex-col items-start justify-between gap-3 text-body-sm text-paper/60 md:flex-row md:items-center">
            <p>{footer.bottom.copyright.replace("{{year}}", String(new Date().getFullYear()))}</p>
            <div className="flex gap-5">
              {footer.bottom.links.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-accent">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
