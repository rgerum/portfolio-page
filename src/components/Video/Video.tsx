import styles from "./Video.module.css";

interface VideoProps {
  id: string;
}

function Video({ id }: VideoProps) {
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
