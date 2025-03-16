import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Code } from "bright";

import { getDocsData, getPageData } from "@/helpers/read-files";
import styles from "./layout.module.css";
import ProjectTitle from "@/components/ProjectTitle";
import SpotOverviewImage from "@/components/SpotOverviewImage";
import NavAside from "@/components/NavAside";
import Video from "@/components/Video";
import NavAsideLinks from "@/components/NavAsideLinks";
import NavAsideProjects from "@/components/NavAsideProjects";
import ElvisExample from "@/components/ElvisExample";

const IMAGES = {};

import duostories_courses from "../../../../public/duostories/courses.jpg";
IMAGES["duostories_courses"] = duostories_courses;
import duostories_audio from "../../../../public/duostories/audio.jpg";
IMAGES["duostories_audio"] = duostories_audio;
import duostories_editor from "../../../../public/duostories/editor.jpg";
IMAGES["duostories_editor"] = duostories_editor;

import elvis_overview from "../../../../public/elvis/overview.jpg";
IMAGES["elvis_overview"] = elvis_overview;

import pylustrator_figure1 from "../../../../public/pylustrator/figure1.jpg";
IMAGES["pylustrator_figure1"] = pylustrator_figure1;
import pylustrator_figure2 from "../../../../public/pylustrator/figure2.jpg";
IMAGES["pylustrator_figure2"] = pylustrator_figure2;

import spot_image2 from "../../../../public/spot/image2.jpg";
IMAGES["spot_image2"] = spot_image2;
import spot_image16 from "../../../../public/spot/image16.jpg";
import NavAsideWrapper from "@/components/NavAsideWrapper";
IMAGES["spot_image16"] = spot_image16;

import iwc_curve from "../../../../public/barudion/curve.png";
IMAGES["iwc_curve"] = iwc_curve;

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
    title: data.title + " - Richard Gerum",
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
  Video: Video,
  ElvisExample: ElvisExample,
  pre: (props) => (
    <Code {...props} className={styles.code}>
      {props.children}
    </Code>
  ),
  ImageNamed: ({ name, ...delegated }) => (
    <Image
      src={IMAGES[name]}
      placeholder="blur"
      style={{ maxWidth: "100%", height: "auto" }}
      {...delegated}
    />
  ),
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
  if (path.endsWith(".js") || path.endsWith(".mdx")) return notFound();

  let { data, content } = await getPageData(path);

  const MyTags = () => <Tags tags={data.tags} />;

  return (
    <>
      <main className={styles.main}>
        <ProjectTitle>{data.title}</ProjectTitle>

        <CustomMDX source={content} components={{ Tags: MyTags }} />
      </main>
      <NavAsideWrapper>
        <NavAsideProjects />
        <NavAside headings={getSideHeadings(content)} />
        <NavAsideLinks
          external_links={Object.entries(data.links).map(([k, v]) => {
            return { id: v, text: k };
          })}
        />
      </NavAsideWrapper>
    </>
  );
}

function Tags({ tags }) {
  if (!tags) return null;
  return (
    <ul className={styles.tags}>
      {tags.split(",").map((tag) => (
        <li key={tag} className={styles.tag_item}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function getSideHeadings(content) {
  const headings = [];
  let last_line = "";
  for (let line of content.split("\n")) {
    if (line.startsWith("#")) {
      let [, count, text] = line.match("(#*)s*(.*)");
      headings.push({ level: count.length, text: text, id: save_tag(text) });
    }
    if (line.match(/^=+\s*$/))
      headings.push({ level: 1, text: last_line, id: save_tag(last_line) });
    if (line.match(/^-+\s*$/))
      headings.push({ level: 2, text: last_line, id: save_tag(last_line) });
    last_line = line;
  }
  return headings;
}
