import { useEffect, useState } from "react";
import { ExtendedText } from "../../types";
import { deleteItem, getAllItems } from "../../clients/doorApiClient";
import ExtendedTextItem from "./ExtendedTextItem";
import Button from "../UI/Button";
import styles from "./ListExtendedText.module.css";
import ExtendedTextForm from "./ExtendedTextForm";

export default function ListExtendedText(props: {
  roomId: number;
  extendedTexts: Array<ExtendedText>;
}) {
  const [extendedTexts, setExtendedTexts] = useState(props.extendedTexts);
  const [form, setForm] = useState(<></>);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    getAllItems<ExtendedText>("/extendedTexts", {
      roomId: String(props.roomId),
    }).then((response: ExtendedText[]) => {
      setExtendedTexts(response);
    });
  }, [form, props.roomId]);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const extendedText_id = Number(event.currentTarget.value);
    openForm(extendedText_id);
  };

  const openForm = (extendedText_id?: number) => {
    const extendedText =
      extendedTexts.find(
        (extendedText) => Number(extendedText.id) === extendedText_id
      ) ?? undefined;
    setIsFormOpen(true);
    setForm(
      <ExtendedTextForm
        roomId={props.roomId}
        closeForm={closeForm}
        extendedText={extendedText ?? undefined}
      ></ExtendedTextForm>
    );
  };

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.value);
    deleteItem("/extendedTexts", id);

    setExtendedTexts((oldExtendedTexts) => {
      return oldExtendedTexts.filter((extendedText) => extendedText.id !== id);
    });
  };

  const closeForm = () => {
    setForm(<></>);
    setIsFormOpen(false);
  };

  return (
    <div className={styles["list-extended-text"]}>
      {isFormOpen ? (
        form
      ) : (
        <>
          <h3>Lista de textos estendidos</h3>
          <Button onClick={() => openForm()} value={"Add New ExtendedText"}>
            Adicionar um novo texto estendido
          </Button>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sentence</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {extendedTexts.map((extendedText) => {
                return (
                  <ExtendedTextItem
                    key={extendedText.id}
                    extendedText={extendedText}
                    onDelete={deleteHandler}
                    onEdit={editHandler}
                  ></ExtendedTextItem>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
