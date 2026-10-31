import { MediaImage } from "./MediaImage";
import { Reveal } from "./Reveal";
import { HyfRichText } from "@/src/lib/hyfolio/primitives/rich-text";
import type { Service } from "@/payload-types";

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold">
            Services
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            What I can help you with.
          </p>
        </Reveal>

        {services.length === 0 ? (
          <p className="mt-8 text-center text-muted-foreground">
            No services added yet — add some in the Payload admin.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.id}
                delay={index * 80}
                className="h-full"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                  {service.image ? (
                    <MediaImage
                      media={service.image}
                      alt={service.title}
                      width={400}
                      height={225}
                      className="h-56 w-full object-cover"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-3 flex-1 text-muted-foreground">
                      {service.summary}
                    </p>
                    {service.description ? (
                      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <HyfRichText content={service.description} />
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
