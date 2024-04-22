import React from "react";
import styles from "./Video.module.css";

function Video({ id }) {
  return (
    <div className={styles.wrapper}>
      <iframe
        src={"//www.youtube.com/embed/" + id}
        frameBorder="0"
        allowFullScreen
        className={styles.iframe}
      ></iframe>
    </div>
  );
}

export default Video;
