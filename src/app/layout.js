import React from "react";
import "./styles.css";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";
import styles from "./layout.module.css";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  return (
    <html lang="en" className={clsx(mainFont.variable, monoFont.variable)}>
      <body>
        <nav>Header</nav>
        <main className={styles.main}>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}

export default RootLayout;