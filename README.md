# Dyfk — Portfolio

A content-managed portfolio site built with **Next.js 16**, **Payload CMS 3**, and
**MongoDB**. All site content is editable from the Payload admin panel.

## Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS 4
- **CMS:** Payload CMS 3 (Lexical rich text, Mongoose/MongoDB)
- **Language:** TypeScript

## Getting started

```bash
pnpm install
pnpm dev
```

- Frontend: <http://localhost:3000>
- Payload admin: <http://localhost:3000/admin>

## Environment variables

| Variable              | Required | Purpose                                        |
| --------------------- | -------- | ---------------------------------------------- |
| `PAYLOAD_SECRET`      | yes      | Secret used by Payload                         |
| `DATABASE_URL`        | yes      | MongoDB connection string                      |
| `CONTACT_NOTIFY_EMAIL`| no       | Email that receives new contact-form messages  |

Copy `.env.example` → `.env` if you don't already have one. To actually receive
email notifications from the contact form, also configure a Payload email
adapter (e.g. Resend or Nodemailer) in `payload.config.ts`; without one, the
submission still saves to the `get-in-touch` collection and the notification is
skipped safely.

## Content model

Content is managed entirely from the Payload admin (`/admin`).

### Globals

- **Site Settings** (`site-settings`) — name, role, tagline, bio, profile/hero
  images, contact details, resume file, social links, and SEO fields.

### Collections

- **Projects** (`projects`) — title, slug, excerpt, rich-text description,
  featured image, gallery, live/source URLs, and technologies. Rendered as the
  featured grid and at `/project/[slug]`.
- **Technologies** (`technologies`) — the Skills section, grouped by category
  with optional color badges.
- **Services** (`services`) — the Services section.
- **Experience** (`experience`) — work/education timeline.
- **Testimonials** (`testimonials`) — quotes with optional avatar and rating.
- **Posts** (`posts`) — the blog, at `/blog` and `/blog/[slug]`.
- **Get In Touch** (`get-in-touch`) — contact-form submissions (admin-only read).
- **Media** (`media`) — uploaded images and files.

## Routes

| Route               | Description                     |
| ------------------- | ------------------------------- |
| `/`                 | One-page portfolio              |
| `/project/[slug]`   | Project case study              |
| `/blog`             | Blog index                      |
| `/blog/[slug]`      | Blog post                       |
| `/admin`            | Payload admin panel             |
| `/sitemap.xml`      | Auto-generated sitemap          |
| `/robots.txt`       | Robots rules                    |

## Scripts

```bash
pnpm dev      # start the dev server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # run ESLint
```
