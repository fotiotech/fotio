import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order", "createdAt"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "description", type: "richText" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "order", type: "number", admin: { description: "Used for sorting" } },
  ],
};
