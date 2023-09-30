import React, { useEffect, useState } from "react";
import Http from "../../http/Http";
import { Room } from "../../types";
import RoomForm from "./RoomForm";
import styles from "./ListRoom.module.css";
import { getCookie } from "../../cookie/cookieService";
import RoomItem from "./RoomItem";
import Button from "../UI/Button";

export default function ListRoom() {
  const [rooms, setRooms] = useState(Array<Room>);
  const [form, setForm] = useState(<></>);

  useEffect(() => {
    Http.get<Room>("/rooms", {
      authorization: getCookie("door_game_token") ?? "",
    }).then((responseRooms) => {
      setRooms(responseRooms);
    });
  }, [form]);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const room_id = Number(event.currentTarget.value);
    openForm(room_id);
  };

  const validate = (room: Room) => {
    const samePathRoom = rooms.find((r) => r.path === room.path);
    if (samePathRoom && samePathRoom.id !== room.id) {
      return { isValid: false, message: "não pode ter paths iguais po" };
    }
    return { isValid: true, message: "" };
  };

  const openForm = (room_id?: number) => {
    const room = rooms.find((room) => Number(room.id) === room_id) ?? undefined;
    setForm(
      <RoomForm
        validate={validate}
        closeForm={closeForm}
        room={room ?? undefined}
      ></RoomForm>
    );
  };

  const closeForm = () => {
    setForm(<></>);
  };

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.value);
    Http.delete("/rooms", id, {
      authorization: getCookie("door_game_token") ?? "",
    })
      .then((response) => {
        if (response.status > 300) return alert("Deu ruim");
        setRooms((oldRooms) => {
          return oldRooms.filter((room) => room.id !== id);
        });
      })
      .catch(() => {
        alert("Deu Ruim ):");
      });
  };

  return (
    <>
      {form}
      <h2>Rooms List</h2>
      <Button onClick={() => openForm()} value={"Add New Room"}>
        Add New Room
      </Button>
      <table className={styles.table}>
        <tr>
          <th>Title</th>
          <th>Path</th>
          <th>Actions</th>
        </tr>
        {rooms.map((room) => {
          return (
            <RoomItem
              key={room.id}
              room={room}
              onDelete={deleteHandler}
              onEdit={editHandler}
            ></RoomItem>
          );
        })}
      </table>
    </>
  );
}
