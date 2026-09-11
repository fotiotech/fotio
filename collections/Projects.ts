import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "featured", "order", "createdAt"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", unique: true, index: true },
    {
      name: "excerpt",
      type: "text",
      required: true,
      admin: { description: "One-liner for project cards" },
    },
    { name: "description", type: "richText", required: true },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "caption", type: "text" },
      ],
    },
    { name: "liveUrl", type: "text" },
    { name: "sourceUrl", type: "text" },
    {
      name: "technologies",
      type: "relationship",
      relationTo: "technologies",
      hasMany: true,
      required: true,
    },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number" },
  ],
};
