import type { CollectionConfig } from "payload";

export const GetInTouch: CollectionConfig = {
  slug: "get-in-touch",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "email", "contact", "createdAt"],
    group: "Inbox",
  },
  access: {
    // Anyone can submit (create), only logged-in admins can read/update/delete
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "contact", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: ["new", "read", "replied", "archived"],
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
};
