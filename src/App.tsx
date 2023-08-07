import Main from "./components/Main";
import Header from "./components/MainHeader/Header";
import Menu from "./components/Menu";
import { useContext, useState } from "react";

import styles from "./App.module.css";
import Login from "./components/Login/Login";
import AuthContext from "./store/AuthContext";

function App() {
  const [activePage, setActivePage] = useState("main");

  const context = useContext(AuthContext);
  console.log("Context", context);

  function changePage(page: string) {
    setActivePage(page);
  }

  return (
    <div className={styles.app_container}>
      <Header />

      {context.isLoggedIn ? (
        <>
          <Menu activePage={activePage} setActivePage={changePage} />
          <Main
            name="Lista de Quartos"
            setActivePage={changePage}
            activePage={activePage}
          />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
