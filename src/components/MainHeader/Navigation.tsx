import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const context = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <button onClick={context.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
