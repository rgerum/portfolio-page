import fs from "node:fs/promises";
import path from 'path';
import React from "react";
import * as matter from 'gray-matter';

const basefolder = "content";

export async function getPageData(path) {
  try {
    const res = await fs.readFile(basefolder + "/" + path + ".mdx", "utf8");
    return matter(res);
  } catch (e) {
    return { title: path, body: "" };
  }
}

export const getDocsData = React.cache(async () => {
  const fileNames = await fs.readdir(basefolder);
  return fileNames
});
