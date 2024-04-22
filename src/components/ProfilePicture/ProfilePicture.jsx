import React from "react";
import styles from "./ProfilePicture.module.css";
import clsx from "clsx";
import Image from "next/image";

const size = 150;
function ProfilePicture({ ...delegated }) {
  return (
    <>
      <div className={clsx(styles.wrapper, styles.wrapper2)} {...delegated}>
        <Image
          className={styles.me2}
          src={"/Richard.jpg"}
          width={size}
          height={size}
          alt={""}
        />
      </div>
      <div className={styles.wrapper} {...delegated}>
        <Image
          className={styles.me}
          src={"/Richard.jpg"}
          width={size}
          height={size}
          alt={"my profile picture"}
        />
      </div>
    </>
  );
}

export default ProfilePicture;
