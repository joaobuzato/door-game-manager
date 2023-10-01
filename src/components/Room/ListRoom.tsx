import React, { useEffect, useState } from "react";
import Http from "../../http/Http";
import { Room } from "../../types";
import RoomForm from "./RoomForm";
import styles from "./ListRoom.module.css";
import { getCookie } from "../../cookie/cookieService";
import { deleteItem, getAll } from "../../clients/doorApiClient";
import RoomItem from "./RoomItem";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

export default function ListRoom() {
  const [rooms, setRooms] = useState(Array<Room>);
  const [form, setForm] = useState(<></>);

  useEffect(() => {
    getAll("/rooms").then((responseRooms) => {
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
      <Modal onCloseModal={closeForm}>
        <RoomForm
          validate={validate}
          closeForm={closeForm}
          room={room ?? undefined}
        ></RoomForm>
      </Modal>
    );
  };

  const closeForm = () => {
    setForm(<></>);
  };

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.value);
    deleteItem("/rooms", id);
    setRooms((oldRooms) => {
      return oldRooms.filter((room) => room.id !== id);
    });
  };

  return (
    <div className={styles["list-room"]}>
      {form}
      <h2>Rooms List</h2>
      <Button onClick={() => openForm()} value={"Add New Room"}>
        Add New Room
      </Button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Path</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
}
