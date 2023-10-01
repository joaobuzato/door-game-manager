import { useState } from "react";
import { Door } from "../../types";
import { deleteItem } from "../../clients/doorApiClient";
import DoorItem from "./DoorItem";
import Button from "../UI/Button";
import styles from "./ListDoor.module.css";
import DoorForm from "./DoorForm";

export default function ListDoor(props: {
  roomId: number;
  doors: Array<Door>;
}) {
  const [doors, setDoors] = useState(props.doors);
  const [form, setForm] = useState(<></>);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const door_id = Number(event.currentTarget.value);
    openForm(door_id);
  };
  const openForm = (door_id?: number) => {
    const door = doors.find((door) => Number(door.id) === door_id) ?? undefined;
    setIsFormOpen(true);
    setForm(
      <DoorForm
        roomId={props.roomId}
        closeForm={closeForm}
        door={door ?? undefined}
      ></DoorForm>
    );
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
    setIsFormOpen(false);
  };
  return (
    <div className={styles["list-door"]}>
      {isFormOpen ? (
        form
      ) : (
        <>
          <h3>Doors List</h3>
          <Button onClick={() => openForm()} value={"Add New Door"}>
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
        </>
      )}
    </div>
  );
}
