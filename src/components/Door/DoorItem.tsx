import { Door } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./DoorItem.module.css";

export default function DoorItem(props: {
  door: Door;
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
      <td>{props.door.path}</td>
      <td>{props.door.color}</td>
      <td className={styles.actions}>
        <button
          className={styles.button}
          value={props.door.id}
          onClick={editHandler}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          className={styles.button}
          value={props.door.id}
          onClick={deleteHandler}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}
