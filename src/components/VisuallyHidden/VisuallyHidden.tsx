// Uses from Josh Comeau
// https://www.joshwcomeau.com/snippets/react-components/visually-hidden/

import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import styles from "./VisuallyHidden.module.css";

interface VisuallyHiddenProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
}

const VisuallyHidden = ({ children, ...delegated }: VisuallyHiddenProps) => {
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };
      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);
  if (forceShow) {
    return <>{children}</>;
  }
  return (
    <span className={styles.hidden} {...delegated}>
      {children}
    </span>
  );
};
export default VisuallyHidden;
