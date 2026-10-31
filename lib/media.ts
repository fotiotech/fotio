import type { Media } from "@/payload-types";

/**
 * Payload stores upload/relationship fields as either the raw id string
 * (when not populated) or the full Media document (when populated via depth).
 */
export type MediaLike = string | Media | null | undefined;

export interface ResolvedMedia {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export function resolveMedia(value: MediaLike): ResolvedMedia {
  if (!value || typeof value === "string") {
    return {};
  }
  return {
    src: value.url ?? undefined,
    alt: value.alt ?? "",
    width: value.width ?? undefined,
    height: value.height ?? undefined,
  };
}

export function mediaUrl(value: MediaLike): string | undefined {
  return resolveMedia(value).src;
}

export function mediaAlt(value: MediaLike): string {
  return resolveMedia(value).alt ?? "";
}

/** Resolve a (possibly relative) URL to an absolute one using a base origin. */
export function absoluteUrl(
  url: string | undefined,
  base?: string | null,
): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (base) {
    try {
      return new URL(url, base).toString();
    } catch {
      return undefined;
    }
  }
  return undefined;
}
