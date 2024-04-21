import React from "react";
import styles from "./Header.module.css";
import Logo from "@/components/Logo";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
}

export default Header;
