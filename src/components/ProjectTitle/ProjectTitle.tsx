"use client";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./ProjectTitle.module.css";
import { motion } from "framer-motion";

interface ProjectTitleProps {
  children: ReactNode;
}

function ProjectTitle({ children }: ProjectTitleProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function listener() {
      setVisible(window.scrollY > 1);
    }
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

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
