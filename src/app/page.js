import React from "react";
import styles from "@/app/projects/[project_name]/layout.module.css";
import NavAsideProjects from "@/components/NavAsideProjects";

export default function Page() {
  return (
    <>
      <main className={styles.main}></main>
      <aside className={styles.aside}>
        <NavAsideProjects />
      </aside>
    </>
  );
}
