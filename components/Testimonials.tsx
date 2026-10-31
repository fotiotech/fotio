import { MediaImage } from "./MediaImage";
import { Reveal } from "./Reveal";
import type { Testimonial } from "@/payload-types";

function Stars({ rating }: { rating?: number | null }) {
  if (!rating) return null;
  const filled = Math.max(1, Math.min(5, Math.round(rating)));
  return (
    <div
      className="text-sm text-yellow-500"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {"★".repeat(filled)}
      <span className="text-muted-foreground">{"★".repeat(5 - filled)}</span>
    </div>
  );
}

export default function Testimonials({
  items,
}: {
  items: Testimonial[];
}) {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-3xl font-semibold">
            Testimonials
          </h2>
          <p className="mt-2 text-muted-foreground">
            Kind words from people I&apos;ve worked with.
          </p>
        </Reveal>

        {items.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No testimonials yet.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.id} delay={index * 60} className="h-full">
                <figure className="flex h-full flex-col rounded-xl border border-border bg-background p-6 shadow-sm">
                  <Stars rating={item.rating} />
                  <blockquote className="mt-3 flex-1 text-muted-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    {item.avatar ? (
                      <MediaImage
                        media={item.avatar}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      {item.role ? (
                        <div className="text-xs text-muted-foreground">
                          {item.role}
                        </div>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
