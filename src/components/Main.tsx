import React, { useState } from "react";
import ListRoom from "./ListRoom";
import MainPage from "./MainPage";

export default function Main(props: { name: string }) {
  const [page, setPage] = useState("listRoom");
  // const toggleButton = () => {
  //   setPage((oldPage) => {
  //     return oldPage === "listRoom" ? "" : "listRoom";
  //   });
  // };
  const changePage = (page: string) => {
    setPage(page);
  };
  return (
    <main>
      {page === "main" && <MainPage></MainPage>}
      {page === "listRoom" && <ListRoom changePage={changePage}></ListRoom>}
    </main>
  );
}
