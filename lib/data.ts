import { getPayload } from "payload";
import configPromise from "@payload-config";

import type {
  Experience,
  Post,
  Project,
  Service,
  SiteSetting,
  Technology,
  Testimonial,
} from "@/payload-types";

export async function getPayloadClient() {
  return getPayload({ config: configPromise });
}

export async function getSiteSettings(): Promise<SiteSetting> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "site-settings", depth: 2 });
}

export async function getProjects(): Promise<Project[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    depth: 2,
    sort: "order",
    limit: 100,
  });
  return docs;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    depth: 2,
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function getTechnologies(): Promise<Technology[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "technologies",
    depth: 0,
    sort: "order",
    limit: 200,
  });
  return docs;
}

export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "services",
    depth: 1,
    sort: "order",
    limit: 100,
  });
  return docs;
}

export async function getExperience(): Promise<Experience[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "experience",
    depth: 0,
    sort: "-order",
    limit: 100,
  });
  return docs;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "testimonials",
    depth: 1,
    sort: "order",
    limit: 100,
  });
  return docs;
}

export async function getPosts(): Promise<Post[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    depth: 1,
    where: { status: { equals: "published" } },
    sort: "-publishedDate",
    limit: 100,
  });
  return docs;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    depth: 1,
    where: { status: { equals: "published" }, slug: { equals: slug } },
    limit: 1,
  });
  return docs[0] ?? null;
}

/** Resolve a post's display date (publishedDate fallback to createdAt). */
export function postDate(post: Post): string {
  return post.publishedDate ?? post.createdAt;
}
