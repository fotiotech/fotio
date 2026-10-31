import Link from "next/link";
import { ArrowUpRightIcon, Code2Icon } from "lucide-react";

import { MediaImage } from "./MediaImage";
import { Reveal } from "./Reveal";
import type { Project, Technology } from "@/payload-types";

function techNames(techs: (string | Technology)[] | undefined): string[] {
  if (!techs) return [];
  return techs
    .map((t) => (typeof t === "string" ? t : t.name))
    .filter(Boolean);
}

export default function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const list = featured.length > 0 ? featured : projects;

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-3xl font-semibold">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            A selection of things I&apos;ve built.
          </p>
        </Reveal>

        {list.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No projects added yet — add some in the Payload admin.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {list.map((project, index) => {
              const techs = techNames(project.technologies);
              const href = project.slug ? `/project/${project.slug}` : null;

              return (
                <Reveal key={project.id} delay={index * 60} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md">
                    <div className="relative h-52 w-full overflow-hidden bg-muted">
                      <MediaImage
                        media={project.featuredImage}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <p className="mt-2 flex-1 text-muted-foreground">
                        {project.excerpt}
                      </p>

                      {techs.length > 0 ? (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {techs.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-5 flex items-center gap-4">
                        {href ? (
                          <Link
                            href={href}
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          >
                            View case study <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                          </Link>
                        ) : null}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                          >
                            Live <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                          </a>
                        ) : null}
                        {project.sourceUrl ? (
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Source code for ${project.title}`}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
                          >
                            <Code2Icon className="size-4" aria-hidden="true" /> Source
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
