import React from "react";
import styles from "@/app/projects/[project_name]/layout.module.css";
import NavAsideProjects from "@/components/NavAsideProjects";
import ProfilePicture from "@/components/ProfilePicture";
import Link from "next/link";
import Plot from "@/components/Plot";
import { Spring, CanvasSprings } from "@/components/Plot/Spring";
import ElvisExample from "@/components/ElvisExample";
import styles2 from "./layout.module.css";

export const metadata = {
  title: "Richard Gerum - Portfolio",
};

export default function Page() {
  return (
    <>
      <main className={styles.main}>
        <ProfilePicture />
        <h1 className={styles.about_me}>About Me</h1>
        {/*
        <p>
          I started programming as a teenager when I realized that playing
          computer games is fun, but it&apos;s actually more fun to develop my
          own.
        </p>
        <p>
          The same desire to find out how things work fueled my curiosity to
          study physics. Here again I realized how important programming skills
          are to analyse and visualize data.
        </p>
        <p>
          In my scientific career, I always had a focus on using my software
          skills and create great user experiences. For scientific analysis
          tools and for educational visualisations.
        </p>
        <p>The user experience should be as pleasant as playing a game.</p>
        <h2>Projects</h2>
        <p>
          I know you want to see some proof of what I can do ;-) so check out a
          selection of my projects:
        </p>*/}
        <p>
          "Back in my teens, I figured out that as much fun as playing computer
          games was, building my own was even better. That’s how I got hooked on
          programming. It wasn't just about making games; I was fascinated by
          figuring out how things worked behind the scenes.
        </p>
        <p>
          This drive took me into physics for my studies, where it hit me just
          how crucial programming is—not just for creating stuff, but for
          analyzing and visualizing complex data. Whether I was crunching
          numbers or plotting graphs, I always aimed to make the tools I
          developed as fun and user-friendly as gaming.
        </p>
        <p>
          Throughout my career in science, I’ve focused on blending my coding
          skills with my knack for creating engaging user experiences. From
          developing scientific analysis tools to crafting educational
          visualizations, I've always aimed to make the experience as smooth and
          enjoyable as possible.
        </p>
        <p>
          I believe that whether it's for serious scientific research or just
          learning new concepts, using these tools should feel as natural and
          fun as playing a game."
        </p>
        <h2>Projects</h2>
        <p>
          I know you want to see some examples of what I do! so check out a
          selection of my projects:
        </p>
        <ProjectList />
      </main>
      <aside className={styles.aside}>
        <NavAsideProjects />
      </aside>
    </>
  );
}

function ProjectList() {
  const links = [
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

  return (
    <>
      <ol className={styles2.proj_list}>
        {links.map(({ text, id, tags }) => (
          <li key={id}>
            <Link className={styles2.proj_entry} href={"/projects/" + id}>
              <div className={styles2.proj_title}>{text}</div>
              <div className={styles2.proj_image}>
                <img width={200} height={200} src={`/${id}/title.jpg`} />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

function Tag({ tag }) {
  return <span className={styles2.proj_tag}>{tag}</span>;
}
