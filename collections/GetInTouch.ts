import type { CollectionAfterChangeHook, CollectionConfig } from "payload";

const notifyOwnerAfterChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== "create") return doc;

  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;
  if (!notifyEmail) return doc;

  try {
    await req.payload.sendEmail({
      to: notifyEmail,
      subject: `New message from ${doc.firstName} ${doc.lastName}`,
      text: [
        `Name: ${doc.firstName} ${doc.lastName}`,
        `Email: ${doc.email}`,
        `Contact: ${doc.contact}`,
        "",
        doc.message,
      ].join("\n"),
    });
  } catch (error) {
    // Never block the submission on a mailer misconfiguration.
    console.error("[Contact] Failed to send notification email:", error);
  }

  return doc;
};

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
  hooks: {
    afterChange: [notifyOwnerAfterChange],
  },
  timestamps: true,
};
