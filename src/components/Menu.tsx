import { MouseEvent } from "react";
import styles from "./Menu.module.css";

export default function Menu(props: { setPage: Function; page: string }) {
  const setPageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    props.setPage(e.currentTarget.value);
  };
  return (
    <>
      <aside className={styles.aside}>
        <button
          className={props.page === "listRoom" ? styles.selected : ""}
          key="listRoom"
          value="listRoom"
          onClick={setPageHandler}
        >
          Rooms
        </button>
        <button
          className={props.page === "listDoor" ? styles.selected : ""}
          key="listDoor"
          value="listDoor"
          onClick={setPageHandler}
        >
          Doors
        </button>
      </aside>
    </>
  );
}
