import ListRoom from "./Room/ListRoom";
import Home from "./Home";

export default function Main(props: {
  name: string;
  setPage: Function;
  page: string;
}) {
  const setPageHandler = (page: string) => {
    props.setPage(page);
  };
  return (
    <main>
      {props.page === "main" && <Home></Home>}
      {props.page === "listRoom" && (
        <ListRoom changePage={setPageHandler}></ListRoom>
      )}
    </main>
  );
}
