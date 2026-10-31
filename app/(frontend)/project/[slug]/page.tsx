import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeftIcon, ArrowUpRightIcon, Code2Icon } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { HyfRichText } from "@/src/lib/hyfolio/primitives/rich-text";
import { getProjectBySlug } from "@/lib/data";
import { mediaUrl } from "@/lib/media";
import type { Technology } from "@/payload-types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function techNames(techs: (string | Technology)[] | undefined): string[] {
  if (!techs) return [];
  return techs.map((t) => (typeof t === "string" ? t : t.name)).filter(Boolean);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: "article",
      ...(mediaUrl(project.featuredImage)
        ? { images: [{ url: mediaUrl(project.featuredImage)! }] }
        : {}),
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const techs = techNames(project.technologies);
  const gallery = project.gallery ?? [];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        Back to projects
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.excerpt}</p>

        {techs.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {techs.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Visit live site <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </a>
          ) : null}
          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Code2Icon className="size-4" aria-hidden="true" /> Source code
            </a>
          ) : null}
        </div>
      </header>

      {project.featuredImage ? (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
          <MediaImage
            media={project.featuredImage}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      ) : null}

      {project.description ? (
        <div className="prose-custom mt-10 space-y-4 text-muted-foreground">
          <HyfRichText content={project.description} />
        </div>
      ) : null}

      {gallery.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gallery.map((item, index) => (
              <figure key={item.id ?? index} className="overflow-hidden rounded-xl border border-border">
                <div className="relative aspect-video w-full bg-muted">
                  <MediaImage
                    media={item.image}
                    alt={item.caption ?? `${project.title} image ${index + 1}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {item.caption ? (
                  <figcaption className="p-3 text-sm text-muted-foreground">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
