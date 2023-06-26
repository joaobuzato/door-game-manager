import React, { useEffect, useState } from "react";
import Http from "../../http/Http";
import { Room } from "../../types";
import RoomForm from "./RoomForm";
import Button from "../UI/Button";

export default function ListRoom() {
  const [rooms, setRooms] = useState(Array<Room>);
  const [form, setForm] = useState(<></>);

  useEffect(() => {
    Http.get<Room>("/rooms", {}).then((responseRooms) => {
      setRooms(responseRooms);
    });
  }, []);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const room_id = Number(event.currentTarget.value);
    setForm(<RoomForm closeForm={closeForm} room_id={room_id}></RoomForm>);
  };

  const closeForm = () => {
    setForm(<></>);
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

  return (
    <>
      {form}
      <h2>Rooms List</h2>
      <button
        onClick={() => setForm(<RoomForm closeForm={closeForm}></RoomForm>)}
      >
        Add New Room
      </button>
      <ul>
        {rooms.map((room) => {
          return (
            <li key={room.id}>
              {room.title}
              <Button value={room.id} onClick={editHandler}>
                edit
              </Button>
              <Button value={room.id} onClick={deleteHandler}>
                delete
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
