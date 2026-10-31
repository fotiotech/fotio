import { SocialIcon, SOCIAL_LABELS, type SocialPlatform } from "./icons";
import type { SiteSetting } from "@/payload-types";

export default function Footer({ site }: { site: SiteSetting }) {
  const socials = site.socials ?? [];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
        {socials.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((social) => (
              <a
                key={social.id ?? social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  SOCIAL_LABELS[social.platform as SocialPlatform] ?? social.platform
                }
                className="inline-flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <SocialIcon
                  platform={social.platform as SocialPlatform}
                  className="size-5"
                />
              </a>
            ))}
          </div>
        ) : null}

        <p className="text-sm text-muted-foreground">
          &copy; {year}{" "}
          <span className="font-semibold text-foreground">
            {site.siteName ?? "Portfolio"}
          </span>
          . All rights reserved.
        </p>
        {site.name ? (
          <p className="text-sm text-muted-foreground">
            Design: <span className="font-semibold">{site.name}</span>
          </p>
        ) : null}
      </div>
    </footer>
  );
}
