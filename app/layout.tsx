import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import {
  generatePageMetadata,
  getGlobalSEO,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  SITE_URL,
} from "@/lib/seo";
import { getSiteShell } from "@/lib/cms-server";
import { SiteShellProvider } from "@/lib/site-context";
import { JsonLd } from "@/components/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E0E0E",
};

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("/");
}

const API_ORIGIN = (() => {
  const u = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "";
  try {
    return u ? new URL(u).origin : null;
  } catch {
    return null;
  }
})();

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [shell, globalSEO] = await Promise.all([getSiteShell(), getGlobalSEO()]);

  const orgSchema = generateOrganizationSchema(globalSEO);
  const localBusinessSchema = generateLocalBusinessSchema(globalSEO);
  const faqSchema = generateFAQSchema(globalSEO.faqItems);

  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Geo targeting (India / Rajasthan / Jaipur) */}
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Jaipur" />
        <meta
          name="geo.position"
          content={`${globalSEO.localBusiness.geo?.latitude ?? 26.9124};${globalSEO.localBusiness.geo?.longitude ?? 75.7873}`}
        />
        <meta
          name="ICBM"
          content={`${globalSEO.localBusiness.geo?.latitude ?? 26.9124}, ${globalSEO.localBusiness.geo?.longitude ?? 75.7873}`}
        />

        {/* Crawler hints */}
        <meta
          name="googlebot"
          content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
        />

        {/* Business contact OG tags */}
        {globalSEO.contactInfo.phone && (
          <meta property="business:contact_data:phone_number" content={globalSEO.contactInfo.phone} />
        )}
        {globalSEO.contactInfo.email && (
          <meta property="business:contact_data:email" content={globalSEO.contactInfo.email} />
        )}
        {globalSEO.contactInfo.address?.street && (
          <meta property="business:contact_data:street_address" content={globalSEO.contactInfo.address.street} />
        )}
        {globalSEO.contactInfo.address?.city && (
          <meta property="business:contact_data:locality" content={globalSEO.contactInfo.address.city} />
        )}
        {globalSEO.contactInfo.address?.state && (
          <meta property="business:contact_data:region" content={globalSEO.contactInfo.address.state} />
        )}
        {globalSEO.contactInfo.address?.postalCode && (
          <meta property="business:contact_data:postal_code" content={globalSEO.contactInfo.address.postalCode} />
        )}
        {globalSEO.contactInfo.address?.country && (
          <meta property="business:contact_data:country_name" content={globalSEO.contactInfo.address.country} />
        )}

        {/* DNS prefetch / preconnect for the API origin used by ISR fetches */}
        {API_ORIGIN && <link rel="dns-prefetch" href={API_ORIGIN} />}
        {API_ORIGIN && <link rel="preconnect" href={API_ORIGIN} crossOrigin="anonymous" />}

        {/* Favicon + apple touch icon */}
        {(globalSEO.favicon || shell.siteSettings.favicon) && (
          <link
            rel="icon"
            href={globalSEO.favicon || shell.siteSettings.favicon || ""}
          />
        )}
        {globalSEO.appleTouchIcon && (
          <link rel="apple-touch-icon" href={globalSEO.appleTouchIcon} />
        )}

        {/* Sitemap discovery */}
        <link rel="sitemap" type="application/xml" href={`${SITE_URL}/sitemap.xml`} />

        {/* JSON-LD: Organization + LocalBusiness + (conditional) FAQ */}
        <JsonLd data={[orgSchema, localBusinessSchema, faqSchema]} />

        {/* Google tag manager / analytics — injected raw if admin provided IDs */}
        {globalSEO.googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${globalSEO.googleTagManagerId}');`,
            }}
          />
        )}
        {globalSEO.googleAnalyticsId && !globalSEO.googleTagManagerId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${globalSEO.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${globalSEO.googleAnalyticsId}');`,
              }}
            />
          </>
        )}
        {globalSEO.facebookPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${globalSEO.facebookPixelId}');fbq('track', 'PageView');`,
            }}
          />
        )}

        {/* Admin-provided custom head scripts (raw HTML) */}
        {globalSEO.customHeadScripts && (
          <script dangerouslySetInnerHTML={{ __html: globalSEO.customHeadScripts }} />
        )}
      </head>
      <body>
        <SiteShellProvider value={shell}>
          <LenisProvider>{children}</LenisProvider>
        </SiteShellProvider>
      </body>
    </html>
  );
}
