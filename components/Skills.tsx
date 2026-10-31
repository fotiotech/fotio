import { Reveal } from "./Reveal";
import type { Technology } from "@/payload-types";

function groupByCategory(technologies: Technology[]) {
  const groups = new Map<string, Technology[]>();
  for (const tech of technologies) {
    const key = tech.category ?? "other";
    const list = groups.get(key) ?? [];
    list.push(tech);
    groups.set(key, list);
  }
  return groups;
}

const CATEGORY_LABELS: Record<string, string> = {
  language: "Languages",
  framework: "Frameworks & Tools",
  other: "Other",
};

export default function Skills({ technologies }: { technologies: Technology[] }) {
  const groups = groupByCategory(technologies);
  const categories = Array.from(groups.keys());

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="text-3xl font-semibold">
            Skills <span className="text-primary">&amp; Technologies</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            The languages, frameworks, and tools I work with.
          </p>
        </Reveal>

        {categories.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No technologies added yet — add some in the Payload admin.
          </p>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {categories.map((category, index) => (
              <Reveal key={category} delay={index * 80}>
                <h3 className="mb-4 text-lg font-medium">
                  {CATEGORY_LABELS[category] ?? category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {(groups.get(category) ?? []).map((tech) => (
                    <li
                      key={tech.id}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm"
                    >
                      <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: tech.color ?? "var(--hyf-color-primary)" }}
                      />
                      {tech.website ? (
                        <a
                          href={tech.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {tech.name}
                        </a>
                      ) : (
                        <span>{tech.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
