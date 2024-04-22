import React from "react";
import styles from "@/app/projects/[project_name]/layout.module.css";
import NavAsideProjects from "@/components/NavAsideProjects";
import ProfilePicture from "@/components/ProfilePicture";
import Link from "next/link";

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
          I started programming as a teenager when I realized that playing
          computer games is fun, but it&apos;s actually more fun to develop my
          own.
        </p>
        <p>
          The same desire to find out how things work fueled my curiosity to
          study physics. Here again I realized how important programming skills
          are to analyse and visualize data.
        </p>
        <h2>Projects</h2>
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
    { id: "saenopy", text: "Saenopy" },
    { id: "duostories", text: "Duostories" },
    { id: "spot", text: "Atka Spot" },
    { id: "elvis", text: "ElViS Lesson" },
    { id: "pylustrator", text: "Pylustrator" },
  ];

  return (
    <>
      <ol className={styles.nav_list}>
        {links.map(({ text, id }) => (
          <li key={id}>
            <Link className={styles.link} href={"/projects/" + id}>
              {text}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
