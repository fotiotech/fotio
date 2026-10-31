import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", admin: { description: "e.g. Founder, Acme Inc." } },
    { name: "quote", type: "textarea", required: true },
    { name: "avatar", type: "upload", relationTo: "media" },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      admin: { description: "1–5 stars" },
    },
    { name: "order", type: "number" },
  ],
};
