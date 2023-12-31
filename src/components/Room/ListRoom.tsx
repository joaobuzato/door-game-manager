import React, { useEffect, useState } from "react";
import { Room } from "../../types";
import RoomForm from "./RoomForm";
import styles from "./ListRoom.module.css";
import { deleteItem, getAllItems } from "../../clients/doorApiClient";
import RoomItem from "./RoomItem";
import Button from "../UI/Button";

export default function ListRoom() {
  const [rooms, setRooms] = useState(Array<Room>);
  const [form, setForm] = useState(<></>);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    getAllItems<Room>("/rooms").then((responseRooms) => {
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
    setIsFormOpen(true);
    setForm(
      <RoomForm
        validate={validate}
        closeForm={closeForm}
        room={room ?? undefined}
      ></RoomForm>
    );
  };

  const closeForm = () => {
    setIsFormOpen(false);
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
      {isFormOpen ? (
        form
      ) : (
        <>
          <h2>Lista de quartos</h2>
          <Button onClick={() => openForm()} value={"Add New Room"}>
            Adicionar novo quarto
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
        </>
      )}
    </div>
  );
}
