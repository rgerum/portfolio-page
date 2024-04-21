import React from "react";
import styles from "./Header.module.css";
import Logo from "@/components/Logo";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />
      </div>
      <div className={styles.gradient}></div>
    </header>
  );
}

export default Header;
