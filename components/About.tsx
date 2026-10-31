import { MediaImage } from "./MediaImage";
import { Reveal } from "./Reveal";
import { HyfRichText } from "@/src/lib/hyfolio/primitives/rich-text";
import type { SiteSetting } from "@/payload-types";

export default function AboutSection({ site }: { site: SiteSetting }) {
  const name = site.name ?? "me";

  return (
    <section id="about" className="py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 lg:flex-row">
        <Reveal className="w-full lg:w-1/3">
          {site.profileImage ? (
            <MediaImage
              media={site.profileImage}
              alt={name}
              width={300}
              height={300}
              className="mx-auto rounded-full object-cover shadow-lg"
            />
          ) : null}
        </Reveal>

        <Reveal delay={100} className="w-full lg:w-2/3">
          <h2 className="text-3xl font-semibold">
            About <span className="text-primary">{name}</span>
          </h2>
          {site.bio ? (
            <div className="prose-custom mt-4 space-y-3 text-muted-foreground">
              <HyfRichText content={site.bio} />
            </div>
          ) : (
            <p className="mt-4 text-lg text-muted-foreground">
              I&apos;m passionate about coding, learning new things, and thinking
              about what&apos;s next.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
