import React from "react";
import styles from "./ProjectTitle.module.css";

function ProjectTitle({ children }) {
  return <h1 className={styles.h1}>{children}</h1>;
}

export default ProjectTitle;
