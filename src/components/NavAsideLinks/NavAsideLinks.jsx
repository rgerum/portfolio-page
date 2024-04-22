import React from "react";
import styles from "./NavAsideLinks.module.css";
import Link from "next/link";
import { GitHub } from "react-feather";
import { BookText, FileText, Globe } from "lucide-react";

function NavAsideLinks({ external_links }) {
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

export default NavAsideLinks;
