import Image from "next/image";

import { resolveMedia, type MediaLike } from "@/lib/media";

interface MediaImageProps {
  media: MediaLike;
  alt?: string;
  className?: string;
  /** Render as an absolutely-positioned fill image inside a sized parent. */
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function MediaImage({
  media,
  alt,
  className,
  fill = false,
  sizes,
  width,
  height,
  priority = false,
}: MediaImageProps) {
  const resolved = resolveMedia(media);

  if (!resolved.src) {
    return (
      <div
        className={className}
        style={{ backgroundColor: "var(--hyf-color-muted)" }}
        aria-hidden="true"
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={resolved.src}
        alt={alt ?? resolved.alt ?? ""}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <Image
      src={resolved.src}
      alt={alt ?? resolved.alt ?? ""}
      width={width ?? resolved.width ?? 800}
      height={height ?? resolved.height ?? 600}
      priority={priority}
      className={className}
    />
  );
}
