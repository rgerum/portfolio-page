import React from "react";
import styles from "@/app/projects/[project_name]/layout.module.css";
import NavAsideProjects from "@/components/NavAsideProjects";
import ProfilePicture from "@/components/ProfilePicture";
import Link from "next/link";
import Plot from "@/components/Plot";
import { Spring, CanvasSprings } from "@/components/Plot/Spring";
import ElvisExample from "@/components/ElvisExample";
import styles2 from "./layout.module.css";
import NavAsideWrapper from "@/components/NavAsideWrapper";

export const metadata = {
  title: "Richard Gerum - Portfolio",
};

export default function Page() {
  return (
    <>
      <main className={styles.main}>
        <ProfilePicture />
        <h1 className={styles.about_me}>About Me</h1>

        <p>
          I discovered programming as a teenager, when I realized that playing
          computer games is fun, but it&apos;s actually more fun to develop your
          own. It wasn't just about making games; I was very curious and
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
