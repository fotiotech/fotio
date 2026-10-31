import type { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  admin: {
    useAsTitle: "role",
    defaultColumns: ["role", "organization", "type", "order"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "work",
      options: [
        { label: "Work", value: "work" },
        { label: "Education", value: "education" },
      ],
    },
    { name: "role", type: "text", required: true },
    { name: "organization", type: "text", required: true },
    { name: "startDate", type: "date", required: true },
    { name: "endDate", type: "date" },
    { name: "current", type: "checkbox", defaultValue: false },
    { name: "description", type: "richText" },
    { name: "order", type: "number", admin: { description: "Higher numbers first" } },
  ],
};
