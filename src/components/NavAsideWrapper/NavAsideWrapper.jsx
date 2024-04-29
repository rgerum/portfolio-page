"use client";
import React from "react";
import styles from "./NavAsideWrapper.module.css";
import { Menu, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import VisuallyHidden from "@/components/VisuallyHidden";

function NavAsideWrapper({ children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild={true}>
          <button className={styles.button} onClick={() => setOpen(!open)}>
            <Menu size={32} />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.blur} />
          <Dialog.Content forceMount={true} className={styles.aside_mobile}>
            <Dialog.Close asChild={true}>
              <button className={styles.close} onClick={() => setOpen(false)}>
                <X size={32} />
                <VisuallyHidden>Close</VisuallyHidden>
              </button>
            </Dialog.Close>
            <div className={styles.aside_content}>{children}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <aside className={styles.aside}>{children}</aside>
    </>
  );
}

export default NavAsideWrapper;
