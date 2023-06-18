import React, { useState } from "react";
import ListRoom from "./ListRoom";

export default function Main(props: { name: string }) {
  const [page, setPage] = useState("listRoom");
  const toggleButton = () => {
    setPage((oldPage) => {
      return oldPage === "listRoom" ? "" : "listRoom";
    });
  };
  return (
    <main>
      {page === "listRoom" && <ListRoom></ListRoom>}
      <button onClick={toggleButton}>ToggleListRoom</button>
    </main>
  );
}
