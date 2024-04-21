import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getDocsData, getPageData } from "@/helpers/read-files";
import styles from "./layout.module.css";
import ProjectTitle from "@/components/ProjectTitle";
import SpotOverviewImage from "@/components/SpotOverviewImage";
import NavAside from "@/components/NavAside";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await getDocsData();

  const pages = [];
  for (let page of data) {
    pages.push({ project_name: page });
  }

  return pages;
}

export async function generateMetadata({ params }) {
  let path = params.project_name;
  if (path.endsWith(".js") || path.endsWith(".mdx")) return notFound();

  const { data } = await getPageData(path);

  return {
    title: data.title,
    description: data.description,
  };
}

function save_tag(tag) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

const components = {
  Info: (props) => (
    <p {...props} className={styles.box + " " + styles.info}>
      {props.children}
    </p>
  ),
  Warning: (props) => (
    <p {...props} className={styles.box + " " + styles.warning}>
      {props.children}
    </p>
  ),
  Alert: (props) => (
    <p {...props} className={styles.box + " " + styles.alert}>
      {props.children}
    </p>
  ),
  Channel: (props) => (
    <Link {...props} className={styles.channel_link}>
      {props.children}
    </Link>
  ),
  a: Link,
  Image: (props) => <Image {...props}>{props.children}</Image>,
  h2: (props) => (
    <h2 {...props} id={save_tag(props.children)}>
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} id={save_tag(props.children)}>
      {props.children}
    </h3>
  ),
  SpotOverviewImage: SpotOverviewImage,
};

function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}

export default async function Page({ params }) {
  const path = params.project_name;
  console.log("page", params.project_name);
  if (path.endsWith(".js") || path.endsWith(".mdx")) return notFound();

  let { data, content } = await getPageData(path);
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <div className={styles.spacer} />
      <main className={styles.main}>
        <ProjectTitle>{data.title}</ProjectTitle>
        <CustomMDX source={content} />
      </main>
      <aside className={styles.aside}>
        <NavAside headings={getSideHeadings(content)} />
      </aside>
    </div>
  );
}

function getSideHeadings(content) {
  const headings = [];
  for (let line of content.split("\n")) {
    if (line.startsWith("#")) {
      let [, count, text] = line.match("(#*)s*(.*)");
      //if (count.length === 2)
      headings.push({ level: count.length, text: text, id: save_tag(text) });
    }
  }
  return headings;
}
