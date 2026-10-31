import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "lucide-react";

import { MediaImage } from "@/components/MediaImage";
import { HyfRichText } from "@/src/lib/hyfolio/primitives/rich-text";
import { getPostBySlug, postDate } from "@/lib/data";
import { mediaUrl } from "@/lib/media";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      ...(mediaUrl(post.coverImage)
        ? { images: [{ url: mediaUrl(post.coverImage)! }] }
        : {}),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tags = post.tags ?? [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        Back to blog
      </Link>

      <header className="mt-6">
        <time dateTime={postDate(post)} className="text-sm text-muted-foreground">
          {formatDate(postDate(post))}
        </time>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>

        {tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag.id ?? tag.tag}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {tag.tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {post.coverImage ? (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
          <MediaImage
            media={post.coverImage}
            alt={post.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="prose-custom mt-10 space-y-4 text-muted-foreground">
        <HyfRichText content={post.content} />
      </div>
    </article>
  );
}
