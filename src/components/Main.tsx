import ListRoom from "./Room/ListRoom";
import ListDoor from "./Door/ListDoor";
import Home from "./Home";
import styles from "./Main.module.css";

export default function Main(props: {
  name: string;
  setPage: Function;
  page: string;
}) {
  const setPageHandler = (page: string) => {
    props.setPage(page);
  };
  return (
    <main className={styles.main}>
      {props.page === "main" && <Home></Home>}
      {props.page === "listRoom" && (
        <ListRoom changePage={setPageHandler}></ListRoom>
      )}
      {props.page === "listDoor" && (
        <ListDoor changePage={setPageHandler}></ListDoor>
      )}
    </main>
  );
}
