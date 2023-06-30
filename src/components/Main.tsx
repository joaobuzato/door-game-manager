import ListRoom from "./Room/ListRoom";
import ListDoor from "./Door/ListDoor";
import Home from "./Home";
import styles from "./Main.module.css";
import Button from "./UI/Button";

export default function Main(props: {
  name: string;
  setActivePage: Function;
  activePage: string;
}) {
  const setPageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.setActivePage(event.currentTarget.value);
  };
  return (
    <main className={styles.main}>
      <Button value="main" onClick={setPageHandler}>
        {"< Voltar ao início"}
      </Button>
      {props.activePage === "main" && <Home></Home>}
      {props.activePage === "listRoom" && <ListRoom></ListRoom>}
      {props.activePage === "listDoor" && <ListDoor></ListDoor>}
    </main>
  );
}
