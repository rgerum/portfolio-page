import React from "react";
import styles from "./SpotOverviewImage.module.css";
import clsx from "clsx";

function SpotOverviewImage() {
  return (
    <div className={styles.wrapper}>
      <img src="/spot/IceOverview.png" />
      <div className={styles.hover_me}>
        <div className={styles.hover_circle}></div>
        <img src="/spot/Spot.png" />
        <span className={clsx(styles.label, styles.pointer_device)}>
          hover me
        </span>
        <span className={clsx(styles.label, styles.tap_device)}>tab me</span>
      </div>
    </div>
  );
}

export default SpotOverviewImage;
