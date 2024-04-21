import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Logo from "@/components/Logo";

function Footer() {
  return (
    <footer className={styles.wrapper}>
      <h2>Richard Gerum</h2>
      <nav className={styles.nav}>
        <ul className={styles.nav_ul}>
          <li>
            <Link href={"https://github.com/rgerum"}>Github</Link>
          </li>
          <li>
            <Link href={"https://twitter.com/RichardGerum"}>Twitter</Link>
          </li>
          <li>
            <Link href={"https://www.linkedin.com/in/richard-gerum-77bb3987/"}>
              Linkedin
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
