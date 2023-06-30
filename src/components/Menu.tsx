import { MouseEvent } from "react";
import styles from "./Menu.module.css";

export default function Menu(props: {
  setActivePage: Function;
  activePage: string;
}) {
  const setActivePageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    props.setActivePage(e.currentTarget.value);
  };
  return (
    <>
      <aside className={styles.aside}>
        <button
          className={props.activePage === "listRoom" ? styles.selected : ""}
          key="listRoom"
          value="listRoom"
          onClick={setActivePageHandler}
        >
          Rooms
        </button>
        <button
          className={props.activePage === "listDoor" ? styles.selected : ""}
          key="listDoor"
          value="listDoor"
          onClick={setActivePageHandler}
        >
          Doors
        </button>
      </aside>
    </>
  );
}
