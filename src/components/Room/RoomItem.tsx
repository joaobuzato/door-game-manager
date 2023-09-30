import { Room } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./RoomItem.module.css";

export default function RoomItem(props: {
  room: Room;
  onDelete: Function;
  onEdit: Function;
}) {
  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onEdit(event);
  };
  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onDelete(event);
  };

  return (
    <tr>
      <td>{props.room.title}</td>
      <td>{props.room.path}</td>
      <td className={styles.actions}>
        <button
          className={styles.button}
          value={props.room.id}
          onClick={editHandler}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          className={styles.button}
          value={props.room.id}
          onClick={deleteHandler}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}
