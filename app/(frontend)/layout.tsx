import React from "react";
import type { Metadata } from "next";

import "./styles.css";
import { getSiteSettings } from "@/lib/data";
import { absoluteUrl, mediaUrl } from "@/lib/media";

export const dynamic = "force-dynamic";

const THEME_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();`;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const siteName = site.siteName ?? "Dyfk";
  const title = site.seoTitle ?? `${siteName} — ${site.role ?? "Portfolio"}`;
  const description = site.seoDescription ?? site.tagline ?? "";
  const ogImage = absoluteUrl(mediaUrl(site.ogImage), site.siteUrl);

  return {
    metadataBase: site.siteUrl ? new URL(site.siteUrl) : undefined,
    title: {
      default: title,
      template: `%s — ${siteName}`,
    },
    description,
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      ...(site.siteUrl ? { url: site.siteUrl } : {}),
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const site = await getSiteSettings();

  const siteName = site.siteName ?? "Dyfk";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name ?? siteName,
    ...(site.role ? { jobTitle: site.role } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.siteUrl ? { url: site.siteUrl } : {}),
    ...(site.socials?.length
      ? {
          sameAs: site.socials.map((s) => s.url),
        }
      : {}),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <main>{children}</main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
