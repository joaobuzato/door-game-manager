import ListRoom from "./Room/ListRoom";
import ListDoor from "./Door/ListDoor";
import Home from "./Home";
import styles from "./Main.module.css";
import Button from "./UI/Button";

export default function Main(props: {
  name: string;
  setPage: Function;
  page: string;
}) {
  const setPageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.setPage(event.currentTarget.value);
  };
  return (
    <main className={styles.main}>
      <Button value="main" onClick={setPageHandler}>
        Voltar ao início
      </Button>
      {props.page === "main" && <Home></Home>}
      {props.page === "listRoom" && <ListRoom></ListRoom>}
      {props.page === "listDoor" && <ListDoor></ListDoor>}
    </main>
  );
}
