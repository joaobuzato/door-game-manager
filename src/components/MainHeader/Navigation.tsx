import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

const Navigation = () => {
  const context = useContext(AuthContext);
  return (
    <nav>
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
