import Main from "./components/Main";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { useState } from "react";

import styles from "./App.module.css";

function App() {
  const [activePage, setActivePage] = useState("main");
  function changePage(page: string) {
    setActivePage(page);
  }
  return (
    <div className={styles.app_container}>
      <Header />
      <Menu activePage={activePage} setActivePage={changePage} />
      <Main
        name="Lista de Quartos"
        setActivePage={changePage}
        activePage={activePage}
      />
    </div>
  );
}

export default App;
