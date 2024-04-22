import React from "react";
import styles from "@/app/projects/[project_name]/layout.module.css";
import NavAsideProjects from "@/components/NavAsideProjects";
import ProfilePicture from "@/components/ProfilePicture";

export default function Page() {
  return (
    <>
      <main className={styles.main}>
        <ProfilePicture />
      </main>
      <aside className={styles.aside}>
        <NavAsideProjects />
      </aside>
    </>
  );
}
