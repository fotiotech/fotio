import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { MediaImage } from "./MediaImage";
import { Reveal } from "./Reveal";
import { postDate } from "@/lib/data";
import type { Post } from "@/payload-types";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" });
}

export default function Blog({ posts }: { posts: Post[] }) {
  const recent = posts.slice(0, 3);

  return (
    <section id="blog" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">
                Latest <span className="text-primary">Articles</span>
              </h2>
              <p className="mt-2 text-muted-foreground">
                Notes on what I&apos;m learning and building.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {recent.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No articles published yet.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {recent.map((post, index) => (
              <Reveal key={post.id} delay={index * 60} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
                >
                  {post.coverImage ? (
                    <MediaImage
                      media={post.coverImage}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <time
                      dateTime={postDate(post)}
                      className="text-xs text-muted-foreground"
                    >
                      {formatDate(postDate(post))}
                    </time>
                    <h3 className="mt-2 flex-1 text-lg font-semibold">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
