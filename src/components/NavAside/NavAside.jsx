"use client";
import React from "react";
import styles from "./NavAside.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

function NavAside({ headings }) {
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

  return (
    <>
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
    </>
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
