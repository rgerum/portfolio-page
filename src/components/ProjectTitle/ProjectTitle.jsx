"use client";
import React from "react";
import styles from "./ProjectTitle.module.css";
import { motion } from "framer-motion";

function ProjectTitle({ children }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    function listener() {
      setVisible(window.scrollY > 1);
    }
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [visible]);

  return (
    <>
      {visible ? (
        <>
          <div className={styles.h1_header_container}>
            <motion.h1
              layoutId={"heading"}
              layout={true}
              className={styles.h1_header}
            >
              {children}
            </motion.h1>
          </div>

          <div className={styles.h1_container}>
            <div className={styles.h1}></div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.h1_header_container}>
            <div className={styles.h1_header}></div>
          </div>
          <div className={styles.h1_container}>
            <motion.h1 layoutId={"heading"} layout={true} className={styles.h1}>
              {children}
            </motion.h1>
          </div>
        </>
      )}
      <div className={styles.mobile_only}>
        <div className={styles.h1_container}>
          <h1 className={styles.h1}>{children}</h1>
        </div>
      </div>
    </>
  );
}

export default ProjectTitle;
