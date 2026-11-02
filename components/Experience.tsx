import { BriefcaseIcon, GraduationCapIcon } from "lucide-react";

import { Reveal } from "./Reveal";
import { HyfRichText } from "@/src/lib/hyfolio/primitives/rich-text";
import type { Experience } from "@/payload-types";

function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en", { year: "numeric", month: "short" });
}

function period(item: Experience): string {
  const start = formatDate(item.startDate);
  const end = item.current ? "Present" : formatDate(item.endDate);
  if (start && end) return `${start} — ${end}`;
  return start || end;
}

export default function ExperienceTimeline({ items }: { items: Experience[] }) {
  const sorted = [...items].sort((a, b) => {
    const aStart = a.startDate ?? "";
    const bStart = b.startDate ?? "";
    return bStart.localeCompare(aStart);
  });

  return (
    <section id="experience" className="bg-muted/40 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal>
          <h2 className="text-3xl font-semibold">
            Experience <span className="text-primary">&amp; Education</span>
          </h2>
        </Reveal>

        {sorted.length === 0 ? (
          <p className="mt-8 text-muted-foreground">No experience added yet.</p>
        ) : (
          <ol className="mt-12 space-y-8 border-l border-border pl-6">
            {sorted.map((item, index) => (
              <li key={item.id} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1 flex size-4 items-center justify-center rounded-full border border-border bg-background"
                >
                  {item.type === "education" ? (
                    <GraduationCapIcon
                      className="size-2.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <BriefcaseIcon className="size-2.5" aria-hidden="true" />
                  )}
                </span>

                <Reveal delay={index * 60}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <span className="text-sm text-muted-foreground">
                      {period(item)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary">
                    {item.organization}
                  </p>
                  {item.description ? (
                    <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <HyfRichText content={item.description} />
                    </div>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
