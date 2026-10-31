import type { MetadataRoute } from "next";

import { getPosts, getProjects, getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteSettings();
  const baseUrl = (site.siteUrl ?? "https://example.com").replace(/\/+$/, "");

  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = ["", "/blog"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((project) => project.slug)
    .map((project) => ({
      url: `${baseUrl}/project/${project.slug}`,
      lastModified: new Date(project.updatedAt),
    }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
