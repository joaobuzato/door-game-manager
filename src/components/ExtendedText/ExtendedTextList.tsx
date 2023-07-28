import React, { useEffect, useState } from "react";
import Http from "../../http/Http";
import { ExtendedText } from "../../types";
import styles from "./ListExtendedText.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ListExtendedText() {
  const [extendedTexts, setExtendedTexts] = useState(Array<ExtendedText>);
  const [form, setForm] = useState(<></>);

  useEffect(() => {
    Http.get<ExtendedText>("/extendedTexts", {}).then(
      (responseExtendedTexts) => {
        console.log("fazendo o get", responseExtendedTexts);
        setExtendedTexts(responseExtendedTexts);
      }
    );
  }, [form]);

  const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const extendedText_id = Number(event.currentTarget.value);
    openForm(extendedText_id);
  };

  const validate = (extendedText: ExtendedText) => {
    return { isValid: true, message: "" };
  };
  const openForm = (extendedText_id?: number) => {
    const extendedText =
      extendedTexts.find(
        (extendedText) => Number(extendedText.id) === extendedText_id
      ) || undefined;
    // setForm(
    //   <ExtendedTextForm
    //     validate={validate}
    //     closeForm={closeForm}
    //     extendedText={extendedText ?? undefined}
    //   ></ExtendedTextForm>
    // );
  };

  const closeForm = () => {
    setForm(<></>);
  };

  const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.value);
    Http.delete("/extendedTexts", id)
      .then((response) => {
        if (response.status !== 200) return alert("Deu ruim");
        return alert("Deu bom!"); //TODO adicionar um unshift
      })
      .catch(() => {
        alert("Deu Ruim ):");
      });

    console.log(event.currentTarget.value);
  };

  return (
    <>
      {form}
      <h2>ExtendedTexts List</h2>
      <button onClick={() => openForm()}>Add New ExtendedText</button>
      <ul className={styles.ul}>
        {extendedTexts.map((extendedText) => {
          return (
            <li key={extendedText.id}>
              <p>{extendedText.sentence}</p>
              <div className={styles.actions}>
                <button value={extendedText.id} onClick={editHandler}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button value={extendedText.id} onClick={deleteHandler}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
