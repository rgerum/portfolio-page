import React from "react";
import Image from "next/image";
import styles from "@/app/projects/[project_name]/layout.module.css";
import NavAsideProjects from "@/components/NavAsideProjects";
import ProfilePicture from "@/components/ProfilePicture";
import Link from "next/link";
import Plot from "@/components/Plot";
import { Spring, CanvasSprings } from "@/components/Plot/Spring";
import ElvisExample from "@/components/ElvisExample";
import styles2 from "./layout.module.css";
import NavAsideWrapper from "@/components/NavAsideWrapper";
import { absoluteUrl, JsonLd, siteUrl } from "@/helpers/structured-data";

export const metadata = {
  title: "Richard Gerum - Portfolio",
  alternates: {
    canonical: siteUrl,
  },
};

export default function Page() {
  const projects = getProjects();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Richard Gerum",
        url: siteUrl,
        image: absoluteUrl("/Richard.jpg"),
        sameAs: [
          "https://github.com/rgerum",
          "https://twitter.com/RichardGerum",
          "https://www.linkedin.com/in/richard-gerum-68361a154/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Richard Gerum - Portfolio",
        author: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/#portfolio`,
        url: siteUrl,
        name: "Richard Gerum - Portfolio",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        hasPart: projects.map((project) => ({
          "@type": "CreativeWork",
          "@id": absoluteUrl(`/projects/${project.id}#project`),
          name: project.text,
          url: absoluteUrl(`/projects/${project.id}`),
          keywords: project.tags,
          image: absoluteUrl(project.image ?? `/${project.id}/title.jpg`),
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className={styles.main}>
        <ProfilePicture />
        <h1 className={styles.about_me}>About Me</h1>

        <p>
          I discovered programming as a teenager, when I realized that playing
          computer games is fun, but it&apos;s actually more fun to develop your
          own. It wasn&apos;t just about making games; I was very curious and
          fascinated by figuring out how things worked behind the scenes.
        </p>
        <p>
          This curiosity took me into physics for my studies, where I found out
          that programming is not only about creating stuff, but is also a tool
          to analyze and visualize complex data.
        </p>
        <p>
          Throughout my career in science, I&apos;ve focused on blending my
          coding skills with my attention to detail to make sure I create
          engaging user experiences. From developing scientific analysis tools
          to crafting educational visualizations, I&apos;ve always aimed to make
          the experience as smooth and enjoyable as possible.
        </p>
        <p>
          I believe that whether it&apos;s for rigorous scientific research or
          to automatize just a simple task, using these tools should feel as
          natural and fun as playing a game.
        </p>
        <h2>Projects</h2>
        <p>
          I know you want to see some examples of what I do! So, check out a
          selection of my projects:
        </p>
        <ProjectList />
      </main>
      <NavAsideWrapper>
        <NavAsideProjects />
      </NavAsideWrapper>
    </>
  );
}

function ProjectList() {
  const links = getProjects();

  return (
    <>
      <ol className={styles2.proj_list}>
        {links.map(({ text, id, image, tags }) => (
          <li key={id}>
            <Link className={styles2.proj_entry} href={"/projects/" + id}>
              <div className={styles2.proj_title}>{text}</div>
              <div className={styles2.proj_image}>
                <Image
                  width={200}
                  height={200}
                  src={image ?? `/${id}/title.jpg`}
                  alt={`${text} preview`}
                />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

function getProjects() {
  return [
    {
      id: "verbalane",
      text: "Verbalane",
      image: "/verbalane/title.png",
      tags: ["react", "language learning", "text-to-speech"],
    },
    {
      id: "barudion",
      text: "Barudion",
      tags: ["python", "nextjs", "react"],
    },
    {
      id: "saenopy",
      text: "Saenopy",
      tags: ["python", "Qt", "finite element method", "pytest"],
    },
    {
      id: "duostories",
      text: "Duostories",
      tags: [
        "javascript",
        "react",
        "nextjs",
        "cypress",
        "postgres",
        "storybook",
        "vercel",
      ],
    },
    { id: "spot", text: "Atka Spot", tags: ["python", "flask", "d3.js"] },
    {
      id: "elvis",
      text: "ElViS Lesson",
      tags: ["javascript", "d3.js", "github pages"],
    },
    {
      id: "pylustrator",
      text: "Pylustrator",
      tags: ["python", "matplotlib", "Qt", "code generation"],
    },
  ];
}

function Tag({ tag }) {
  return <span className={styles2.proj_tag}>{tag}</span>;
}
