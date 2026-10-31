import { DownloadIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import ContactForm from "./ContactForm";
import { Reveal } from "./Reveal";
import { SocialIcon, SOCIAL_LABELS, type SocialPlatform } from "./icons";
import { mediaUrl } from "@/lib/media";
import type { SiteSetting } from "@/payload-types";

export default function ContactSection({ site }: { site: SiteSetting }) {
  const socials = site.socials ?? [];
  const resumeUrl = mediaUrl(site.resume);

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Have a project in mind? Let&apos;s talk.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              {site.email ? (
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
                >
                  <MailIcon className="size-5 text-primary" aria-hidden="true" />
                  {site.email}
                </a>
              ) : null}
              {site.phone ? (
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
                >
                  <PhoneIcon className="size-5 text-primary" aria-hidden="true" />
                  {site.phone}
                </a>
              ) : null}
              {site.location ? (
                <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPinIcon className="size-5 text-primary" aria-hidden="true" />
                  {site.location}
                </p>
              ) : null}

              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <DownloadIcon className="size-4" aria-hidden="true" />
                  Download resume
                </a>
              ) : null}

              {socials.length > 0 ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  {socials.map((social) => (
                    <a
                      key={social.id ?? social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        SOCIAL_LABELS[social.platform as SocialPlatform] ??
                        social.platform
                      }
                      className="inline-flex items-center justify-center rounded-full border border-border p-3 transition-colors hover:bg-muted"
                    >
                      <SocialIcon
                        platform={social.platform as SocialPlatform}
                        className="size-5"
                      />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
