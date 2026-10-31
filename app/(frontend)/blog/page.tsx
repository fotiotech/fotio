import Link from "next/link";
import type { Metadata } from "next";

import { MediaImage } from "@/components/MediaImage";
import { getPosts, postDate } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on what I'm learning and building.",
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Notes on what I&apos;m learning and building.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No articles published yet.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
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
                <h2 className="mt-2 flex-1 text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
