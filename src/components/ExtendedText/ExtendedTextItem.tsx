import { ExtendedText } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./ExtendedTextItem.module.css";

export default function ExtendedTextItem(props: {
  extendedText: ExtendedText;
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
      <td>{props.extendedText.sentence}</td>
      <td className={styles.actions}>
        <button
          className={styles.button}
          value={props.extendedText.id}
          onClick={editHandler}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          className={styles.button}
          value={props.extendedText.id}
          onClick={deleteHandler}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </td>
    </tr>
  );
}
