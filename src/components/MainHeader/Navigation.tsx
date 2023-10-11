import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import styles from "./Navigation.module.css";
import React from "react";

const Navigation = () => {
  const context = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      {context.isLoggedIn && (
        <button className={styles.button} onClick={context.onLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;
