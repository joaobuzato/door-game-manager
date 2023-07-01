import React, { useEffect, useState } from "react";
import Http from "../../http/Http";
import { Room } from "../../types";
import RoomForm from "./RoomForm";
import styles from "./ListRoom.module.css";

export default function ListRoom() {
  const [rooms, setRooms] = useState(Array<Room>);
  const [form, setForm] = useState(<></>);

  useEffect(() => {
    Http.get<Room>("/rooms", {}).then((responseRooms) => {
      console.log("fazendo o get", responseRooms);
      setRooms(responseRooms);
    });
  }, [form]);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const room_id = Number(event.currentTarget.value);
    openForm(room_id);
  };

  const openForm = (room_id?: number) => {
    const room = rooms.find((room) => Number(room.id) === room_id) || undefined;
    setForm(
      <RoomForm closeForm={closeForm} room={room ?? undefined}></RoomForm>
    );
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
      <button onClick={() => openForm()}>Add New Room</button>
      <ul className={styles.ul}>
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
