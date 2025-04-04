"use client";
import React from "react";
import styles from "../NavAside/NavAside.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function NavAsideProjects() {
  const pathname = usePathname().split("/").at(-1);
  const links = [
    { id: "barudion", text: "Barudion" },
    { id: "saenopy", text: "Saenopy" },
    { id: "duostories", text: "Duostories" },
    { id: "spot", text: "Atka Spot" },
    { id: "elvis", text: "ElViS Lesson" },
    { id: "pylustrator", text: "Pylustrator" },
  ];

  return (
    <>
      <Link
        className={clsx(
          pathname === "/" ? styles.active_link : styles.link,
          styles.first_link,
        )}
        href={"/"}
      >
        About me
      </Link>
      <div className={styles.header}>Projects</div>
      <ol className={styles.nav_list}>
        {links.map(({ text, id }) => (
          <li key={id}>
            <Link
              className={pathname === id ? styles.active_link : styles.link}
              href={"/projects/" + id}
            >
              {text}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

export default NavAsideProjects;
