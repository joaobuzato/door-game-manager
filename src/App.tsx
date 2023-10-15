import Main from "./components/Main";
import Header from "./components/MainHeader/Header";
import Menu from "./components/Menu";
import { useContext, useState } from "react";
import React from "react";

import styles from "./App.module.css";
import Login from "./components/Login/Login";
import AuthContext from "./store/AuthContext";

function App() {
  const [activePage, setActivePage] = useState("main");

  const context = useContext(AuthContext);

  function changePage(page: string) {
    setActivePage(page);
  }

  return (
    <div className={styles.app_container}>
      <Header />

      {context.isLoggedIn ? (
        <section className={styles.container}>
          <Menu activePage={activePage} setActivePage={changePage} />
          <Main
            name="Conteúdo principal"
            setActivePage={changePage}
            activePage={activePage}
          />
        </section>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
