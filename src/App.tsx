import Main from "./components/Main";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { useState } from "react";

import styles from "./App.module.css";

function App() {
  const [page, setPage] = useState("main");
  function changePage(page: string) {
    setPage(page);
  }
  return (
    <div className={styles.app_container}>
      <Header />
      <Menu setPage={changePage} />
      <Main name="Lista de Quartos" setPage={changePage} page={page} />
    </div>
  );
}

export default App;
