import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedDate", "createdAt"],
    group: "Blog",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", unique: true, index: true, required: true },
    { name: "excerpt", type: "textarea", required: true },
    { name: "content", type: "richText", required: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    { name: "publishedDate", type: "date", admin: { date: { pickerAppearance: "dayOnly" } } },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
