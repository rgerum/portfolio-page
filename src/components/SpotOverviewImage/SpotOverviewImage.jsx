import React from "react";
import styles from "./SpotOverviewImage.module.css";
import clsx from "clsx";
import Image from "next/image";
import im_ice from "../../../public/spot/IceOverview.jpg";

function SpotOverviewImage() {
  return (
    <div className={styles.wrapper}>
      <Image
        priority={true}
        src={im_ice}
        placeholder="blur"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className={styles.hover_me}>
        <div className={styles.hover_circle}></div>
        <img src="/spot/Spot.jpg" />
        <span className={clsx(styles.label, styles.pointer_device)}>
          hover me
        </span>
        <span className={clsx(styles.label, styles.tap_device)}>tab me</span>
      </div>
    </div>
  );
}

export default SpotOverviewImage;
