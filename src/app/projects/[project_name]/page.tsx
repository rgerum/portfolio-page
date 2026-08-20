import type { ReactNode, ElementType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";
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
import NavAsideWrapper from "@/components/NavAsideWrapper";
import type { ExternalLink, Heading } from "@/types/content";

const IMAGES: Record<string, StaticImageData> = {};

import atrium_hero from "../../../../public/atrium/hero.jpg";
IMAGES["atrium_hero"] = atrium_hero;

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
IMAGES["spot_image16"] = spot_image16;

import iwc_curve from "../../../../public/barudion/curve.png";
IMAGES["iwc_curve"] = iwc_curve;

export const dynamic = "force-static";
export const dynamicParams = true;

interface RouteParams {
  project_name: string;
}

interface PageProps {
  params: Promise<RouteParams>;
}

interface CustomMDXProps {
  source: string;
  components?: Record<string, ElementType>;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const data = await getDocsData();
  return data.map((page) => ({ project_name: page }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pagePath = (await params).project_name;
  if (pagePath.endsWith(".js") || pagePath.endsWith(".mdx")) {
    return notFound();
  }

  const { data } = await getPageData(pagePath);

  return {
    title: `${data.title} - Richard Gerum`,
    description: data.description,
  };
}

function saveTag(tag: ReactNode): string {
  const text =
    typeof tag === "string"
      ? tag
      : Array.isArray(tag)
        ? tag.join(" ")
        : String(tag ?? "");

  return text.trim().toLowerCase().replace(/\s+/g, "-");
}

const components: Record<string, ElementType> = {
  Info: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} className={styles.box + " " + styles.info}>
      {props.children}
    </p>
  ),
  Warning: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} className={styles.box + " " + styles.warning}>
      {props.children}
    </p>
  ),
  Alert: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} className={styles.box + " " + styles.alert}>
      {props.children}
    </p>
  ),
  Channel: (props: React.ComponentProps<typeof Link>) => (
    <Link {...props} className={styles.channel_link}>
      {props.children}
    </Link>
  ),
  a: Link,
  Image: (props: React.ComponentProps<typeof Image>) => (
    <Image {...props} alt={props.alt ?? ""} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 {...props} id={saveTag(props.children)}>
      {props.children}
    </h2>
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 {...props} id={saveTag(props.children)}>
      {props.children}
    </h3>
  ),
  SpotOverviewImage: SpotOverviewImage,
  Video: Video,
  ElvisExample: ElvisExample,
  pre: (props: React.ComponentProps<typeof Code>) => (
    <Code {...props} className={styles.code}>
      {props.children}
    </Code>
  ),
  ImageNamed: ({
    name,
    alt,
    ...delegated
  }: { name: string } & Omit<React.ComponentProps<typeof Image>, "src">) => (
    <Image
      src={IMAGES[name]}
      alt={alt ?? ""}
      placeholder="blur"
      style={{ maxWidth: "100%", height: "auto" }}
      {...delegated}
    />
  ),
};

function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}

export default async function Page({ params }: PageProps) {
  const pagePath = (await params).project_name;
  if (pagePath.endsWith(".js") || pagePath.endsWith(".mdx")) {
    return notFound();
  }

  const { data, content } = await getPageData(pagePath);

  const MyTags = () => <Tags tags={data.tags} />;
  const externalLinks: ExternalLink[] = Object.entries(data.links ?? {}).map(
    ([text, id]) => ({ id, text }),
  );

  return (
    <>
      <main className={styles.main}>
        <ProjectTitle>{data.title}</ProjectTitle>

        <CustomMDX source={content} components={{ Tags: MyTags }} />
      </main>
      <NavAsideWrapper>
        <NavAsideProjects />
        <NavAside headings={getSideHeadings(content)} />
        <NavAsideLinks external_links={externalLinks} />
      </NavAsideWrapper>
    </>
  );
}

function Tags({ tags }: { tags?: string }) {
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

function getSideHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  let lastLine = "";

  for (const line of content.split("\n")) {
    if (line.startsWith("#")) {
      const match = line.match(/^(#+)\s*(.*)$/);
      if (match) {
        const [, count, text] = match;
        headings.push({ level: count.length, text, id: saveTag(text) });
      }
    }
    if (line.match(/^=+\s*$/)) {
      headings.push({ level: 1, text: lastLine, id: saveTag(lastLine) });
    }
    if (line.match(/^-+\s*$/)) {
      headings.push({ level: 2, text: lastLine, id: saveTag(lastLine) });
    }
    lastLine = line;
  }
  return headings;
}
