import type { MetadataRoute } from "next";
import matter from "gray-matter";
import fs from "node:fs/promises";
import path from "node:path";
import { siteUrl } from "@/helpers/structured-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentDir = path.join(process.cwd(), "content");
  const files = await fs.readdir(contentDir);
  const projectPages = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const source = await fs.readFile(path.join(contentDir, file), "utf8");
        const { data } = matter(source);

        return {
          slug: file.replace(/\.mdx$/, ""),
          lastModified: new Date(data.lastModified),
        };
      }),
  );
  projectPages.sort((a, b) => a.slug.localeCompare(b.slug));

  const homepageLastModified = new Date(
    Math.max(...projectPages.map((page) => page.lastModified.getTime())),
  );

  return [
    {
      url: siteUrl,
      lastModified: homepageLastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
