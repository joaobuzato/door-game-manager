import React, { useEffect, useState } from "react";
import Http from "../../http/Http";
import { Room } from "../../types";
import RoomForm from "./RoomForm";
import styles from "./ListRoom.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../../cookie/cookieService";

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
      <button onClick={() => openForm()}>Add New Room</button>
      <table className={styles.table}>
        <tr>
          <th>Title</th>
          <th>Path</th>
          <th>Actions</th>
        </tr>
        {rooms.map((room) => {
          return (
            <tr key={room.id}>
              <td>{room.title}</td>
              <td>{room.path}</td>
              <td className={styles.actions}>
                <button
                  className={styles.button}
                  value={room.id}
                  onClick={editHandler}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className={styles.button}
                  value={room.id}
                  onClick={deleteHandler}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
