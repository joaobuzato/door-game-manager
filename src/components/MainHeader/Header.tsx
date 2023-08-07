import { useContext } from "react";
import styles from "./Header.module.css";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <h1>Door Game Manager</h1>
        <Navigation></Navigation>
      </header>
    </>
  );
}
