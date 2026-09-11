import type { CollectionConfig } from "payload";

export const Technologies: CollectionConfig = {
  slug: "technologies",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "slug", "order"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL-friendly identifier, e.g. javascript, nextjs",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Language", value: "language" },
        { label: "Framework", value: "framework" },
      ],
    },
    {
      name: "color",
      type: "text",
      admin: {
        description: "Hex color for badges, e.g. #F7DF1E",
      },
    },
    {
      name: "website",
      type: "text",
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Used for sorting",
      },
    },
  ],
};
