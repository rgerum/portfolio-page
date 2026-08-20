import fs from "node:fs/promises";
import React from "react";
import matter from "gray-matter";

import type { PageFrontmatter } from "@/types/content";

const BASE_FOLDER = "content";

export interface PageData {
  data: PageFrontmatter;
  content: string;
}

export async function getPageData(pagePath: string): Promise<PageData> {
  try {
    const res = await fs.readFile(`${BASE_FOLDER}/${pagePath}.mdx`, "utf8");
    const file = matter(res);
    const data = file.data as Partial<PageFrontmatter>;
    return {
      data: {
        title: data.title ?? pagePath,
        description: data.description,
        links: data.links,
        tags: data.tags,
      },
      content: file.content,
    };
  } catch {
    return {
      data: { title: pagePath },
      content: "",
    };
  }
}

export const getDocsData = React.cache(async (): Promise<string[]> => {
  return fs.readdir(BASE_FOLDER);
});
