import Link from "next/link";

import { MediaImage } from "./MediaImage";
import { Reveal } from "./Reveal";
import { SocialIcon, SOCIAL_LABELS, type SocialPlatform } from "./icons";
import type { SiteSetting } from "@/payload-types";

export default function Hero({ site }: { site: SiteSetting }) {
  const socials = site.socials ?? [];
  const name = site.name ?? "Your Name";
  const role = site.role ?? "";
  const tagline = site.tagline ?? "";

  return (
    <section className="relative overflow-hidden border-b border-border">
      {site.heroImage ? (
        <MediaImage
          media={site.heroImage}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-15"
        />
      ) : null}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
        <Reveal>
          {site.profileImage ? (
            <MediaImage
              media={site.profileImage}
              alt={name}
              width={120}
              height={120}
              priority
              className="mx-auto mb-6 rounded-full object-cover shadow-lg"
            />
          ) : null}
        </Reveal>

        <Reveal delay={80}>
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
            {role}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to <span className="text-primary">{site.siteName ?? "Dyfk"}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {tagline}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => (
              <Link
                key={social.id ?? social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LABELS[social.platform as SocialPlatform] ?? social.platform}
                className="inline-flex items-center justify-center rounded-full border border-border p-3 transition-colors hover:bg-muted"
              >
                <SocialIcon
                  platform={social.platform as SocialPlatform}
                  className="size-5"
                />
              </Link>
            ))}
            {site.phone ? (
              <Link
                href={`tel:${site.phone}`}
                className="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                {site.phone}
              </Link>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
