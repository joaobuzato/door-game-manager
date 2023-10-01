import { useState } from "react";
import { Door } from "../../types";
import Modal from "../UI/Modal";
import { deleteItem } from "../../clients/doorApiClient";
import DoorItem from "./DoorItem";
import Button from "../UI/Button";
import styles from "./ListDoor.module.css";

export default function ListDoor(props: {
  roomId: number;
  doors: Array<Door>;
}) {
  const [doors, setDoors] = useState(Array<Door>);
  const [form, setForm] = useState(<></>);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const door_id = Number(event.currentTarget.value);
    openForm(door_id);
  };
  const openForm = (door_id?: number) => {
    const door = doors.find((door) => Number(door.id) === door_id) ?? undefined;
    setForm(<></>);

    //   <RoomForm
    //     validate={validate}
    //     closeForm={closeForm}
    //     door={door ?? undefined}
    //   ></RoomForm>
  };

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.value);
    deleteItem("/doors", id);

    setDoors((oldDoors) => {
      return oldDoors.filter((door) => door.id !== id);
    });
  };

  const closeForm = () => {
    setForm(<></>);
  };
  return (
    <div className={styles["list-door"]}>
      {form}
      <h2>Doors List</h2>
      <Button onClick={() => openForm()} value={"Add New Room"}>
        Add New Door
      </Button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Path</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doors.map((door) => {
            return (
              <DoorItem
                key={door.id}
                door={door}
                onDelete={deleteHandler}
                onEdit={editHandler}
              ></DoorItem>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
