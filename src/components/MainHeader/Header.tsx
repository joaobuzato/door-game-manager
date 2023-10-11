import styles from "./Header.module.css";
import Navigation from "./Navigation";
import React from "react";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>Door Game Manager</h1>
      </header>
      <Navigation></Navigation>
    </>
  );
}
