"use client";
import React from "react";
import styles from "./NavAside.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHub } from "react-feather";
import { BookText, FileText, Globe } from "lucide-react";
import { motion } from "framer-motion";

function NavAside({ headings, external_links }) {
  const [activeHeading, setActiveHeading] = React.useState(undefined);
  const [activeIndex, setActiveIndex] = React.useState(0);

  function onClick(e, id) {
    e.preventDefault();
    const element = document.getElementById(id);
    // Adjust scroll position to account for the header
    window.scrollBy({
      top: element.getBoundingClientRect().top - 100,
      behavior: "smooth",
    });
    window.history.pushState(null, "", "#" + id);
  }

  React.useEffect(() => {
    function listener() {
      const newActiveHeading = findTopMostVisibleHeading();
      const find = headings.find((h) => h.id === newActiveHeading);
      if (find?.id !== activeHeading) {
        const index = headings.indexOf(find);
        setActiveIndex(index > 0 ? index : 0);
        setActiveHeading(find?.id);
      }
    }
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [headings, activeHeading]);

  const pathname = usePathname().split("/").at(-1);
  const links = [
    { id: "saenopy", text: "Saenopy" },
    { id: "duostories", text: "Duostories" },
    { id: "spot", text: "Atka Spot" },
    { id: "elvis", text: "ElViS Lesson" },
    { id: "pylustrator", text: "Pylustrator" },
  ];

  return (
    <>
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
      <div className={styles.header}>On this page</div>
      <ol className={styles.nav_list + " " + styles.markerlist}>
        <motion.div
          className={styles.marker}
          style={{ y: `calc(100% * ${activeIndex})` }}
        >
          &nbsp;
        </motion.div>
        {headings.map(({ text, id }) => (
          <li key={id}>
            <Link
              href={"#" + id}
              className={
                id === activeHeading ? styles.active_link : styles.link
              }
              onClick={(e) => onClick(e, id)}
            >
              {text}
            </Link>
          </li>
        ))}
      </ol>
      <ExternalLinks external_links={external_links} />
    </>
  );
}

function ExternalLinks({ external_links }) {
  function LinkIcon({ link }) {
    if (link.text === "github")
      return (
        <Link href={link.id} title={"GitHub"}>
          <GitHub />
        </Link>
      );
    if (link.text === "publication")
      return (
        <Link href={link.id} title={"publication"}>
          <FileText />
        </Link>
      );
    if (link.text === "website")
      return (
        <Link href={link.id} title={"website"}>
          <Globe />
        </Link>
      );
    if (link.text === "docs")
      return (
        <Link href={link.id} title={"docs"}>
          <BookText />
        </Link>
      );
    return <Link href={link.id}>{link.text}</Link>;
  }

  return (
    <ol className={styles.icon_list}>
      {external_links.map((link) => (
        <li key={link.id}>
          <LinkIcon link={link} />
        </li>
      ))}
    </ol>
  );
}

function findTopMostVisibleHeading() {
  // Select all heading elements
  const headings = document
    .querySelector("main")
    .querySelectorAll("h2, h3, h4, h5, h6");
  let topMostHeading = null;
  let minTop = Infinity;

  // Iterate through each heading to find the most visible one
  headings.forEach((heading) => {
    const rect = heading.getBoundingClientRect();

    // Check if the element is in the viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Check if this element is closer to the top of the viewport
      if (rect.top < minTop) {
        minTop = rect.top;
        topMostHeading = heading;
      }
    }
  });
  // Return the tag name and text of the top-most heading if it exists
  return topMostHeading?.id;
  //    ? topMostHeading.id + ": " + topMostHeading.textContent
  //    : "No visible heading in viewport";
}

export default NavAside;
