import React, { useEffect, useState } from "react";
import Http from "../../http/Http";
import { Room } from "../../types";

export default function ListRoom(props: { changePage: Function }) {
  const [rooms, setRooms] = useState(Array<Room>);

  useEffect(() => {
    Http.get<Room>("/rooms", {}).then((responseRooms) => {
      setRooms(responseRooms);
    });
  }, []);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
  };
  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.value);
    Http.delete("/rooms", id)
      .then((response) => {
        if (response.status !== 200) return alert("Deu ruim");
        return alert("Deu bom!"); //TODO adicionar um unshift
      })
      .catch(() => {
        alert("Deu Ruim ):");
      });

    console.log(event.currentTarget.value);
  };

  const backHandler = () => {
    props.changePage("main");
  };
  return (
    <>
      <h2>Rooms List</h2>
      <button onClick={backHandler}>Voltar ao início</button>
      <ul>
        {rooms.map((room) => {
          return (
            <li key={room.id}>
              {room.title}
              <button value={room.id} onClick={editHandler}>
                edit
              </button>
              <button value={room.id} onClick={deleteHandler}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
