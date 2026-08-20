"use client";
import { useEffect, useState, type MouseEvent } from "react";
import styles from "./NavAside.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Heading } from "@/types/content";

interface NavAsideProps {
  headings: Heading[];
}

function NavAside({ headings }: NavAsideProps) {
  const [activeHeading, setActiveHeading] = useState<string>();
  const [activeIndex, setActiveIndex] = useState(0);

  function onClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    // Adjust scroll position to account for the header
    window.scrollBy({
      top: element.getBoundingClientRect().top - 100,
      behavior: "smooth",
    });
    window.history.pushState(null, "", "#" + id);
  }

  useEffect(() => {
    function listener() {
      const newActiveHeading = findTopMostVisibleHeading();
      const find = headings.find((h) => h.id === newActiveHeading);
      if (find?.id !== activeHeading) {
        const index = find ? headings.indexOf(find) : -1;
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

function findTopMostVisibleHeading(): string | undefined {
  const main = document.querySelector("main");
  if (!main) {
    return undefined;
  }

  const headings = main.querySelectorAll<HTMLElement>("h2, h3, h4, h5, h6");
  let topMostHeadingId: string | undefined;
  let minTop = Infinity;

  // Iterate through each heading to find the most visible one
  headings.forEach((heading) => {
    const rect = heading.getBoundingClientRect();

    // Check if the element is in the viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Check if this element is closer to the top of the viewport
      if (rect.top < minTop) {
        minTop = rect.top;
        topMostHeadingId = heading.id;
      }
    }
  });
  return topMostHeadingId;
}

export default NavAside;
