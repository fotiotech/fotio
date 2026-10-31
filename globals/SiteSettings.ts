import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true,
  },
  admin: {
    group: "Settings",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Profile",
          fields: [
            { name: "siteName", type: "text", defaultValue: "Dyfk" },
            { name: "name", type: "text", admin: { description: "Your display name" } },
            { name: "role", type: "text", admin: { description: "e.g. Software Developer" } },
            {
              name: "tagline",
              type: "textarea",
              admin: { description: "Hero headline / intro sentence" },
            },
            { name: "bio", type: "richText", admin: { description: "About me section" } },
            { name: "profileImage", type: "upload", relationTo: "media" },
            { name: "heroImage", type: "upload", relationTo: "media" },
            { name: "email", type: "email" },
            { name: "phone", type: "text" },
            { name: "location", type: "text" },
            { name: "resume", type: "upload", relationTo: "media", admin: { description: "CV / resume PDF" } },
          ],
        },
        {
          label: "Social Links",
          fields: [
            {
              name: "socials",
              type: "array",
              fields: [
                {
                  name: "platform",
                  type: "select",
                  required: true,
                  options: [
                    { label: "Twitter / X", value: "twitter" },
                    { label: "Instagram", value: "instagram" },
                    { label: "Facebook", value: "facebook" },
                    { label: "LinkedIn", value: "linkedin" },
                    { label: "GitHub", value: "github" },
                    { label: "YouTube", value: "youtube" },
                    { label: "Dribbble", value: "dribbble" },
                  ],
                },
                { name: "url", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            { name: "seoTitle", type: "text" },
            { name: "seoDescription", type: "textarea" },
            { name: "ogImage", type: "upload", relationTo: "media" },
            { name: "siteUrl", type: "text", admin: { description: "Canonical site URL, e.g. https://example.com" } },
          ],
        },
      ],
    },
  ],
};
