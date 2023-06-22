import { MouseEvent } from "react";

export default function Menu(props: { setPage: Function }) {
  const setPageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    props.setPage(e.currentTarget.value);
  };
  return (
    <>
      <aside>
        <button key="listRoom" value="listRoom" onClick={setPageHandler}>
          Rooms
        </button>
      </aside>
    </>
  );
}
