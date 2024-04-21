import React from "react";
import styles from "./Logo.module.css";
import Link from "next/link";

function Logo() {
  return (
    <Link href={"/"} className={styles.wrapper}>
      Richard Gerum
    </Link>
  );
}

export default Logo;
