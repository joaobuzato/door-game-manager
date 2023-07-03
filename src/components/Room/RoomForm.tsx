import styles from "./RoomForm.module.css";
import { Room } from "../../types";
import { useState } from "react";
import Http from "../../http/Http";
import Input from "../UI/Input";
import { FormProvider, useForm } from "react-hook-form";

export default function RoomForm(props: {
  room?: Room;
  closeForm: Function;
  validate: Function;
}) {
  const cancelHandler = () => {
    props.closeForm();
  };
  const id = Number(props.room?.id ?? 0);
  const [title, setTitle] = useState(props.room?.title ?? "");
  const [text, setText] = useState(props.room?.text ?? "");
  const [path, setPath] = useState(props.room?.path ?? "");

  const methods = useForm();

  const validate = (room: Room) => {
    return props.validate(room);
  };

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const room = { id, title, text, path };
    const validateRoom = validate(room);
    if (!validateRoom.isValid) {
      alert(validateRoom.message);
      return;
    }
    Http.put<Room>("/rooms", Number(room.id), room)
      .then(() => {
        alert("editado com sucesso!");
        cancelHandler();
      })
      .catch(() => {
        alert("deu errado!");
        cancelHandler();
      });
  };
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const room = { id: 0, title, text, path };
    const validateRoom = validate(room);
    if (!validateRoom.isValid) {
      alert(validateRoom.message);
      return;
    }
    Http.post<Room>("/rooms", room)
      .then(() => {
        alert("adicionado com sucesso!");
        cancelHandler();
      })
      .catch(() => {
        alert("deu errado!");
        cancelHandler();
      });
  };

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <h2>{props.room ? "Update Room" : "Insert a Room"}</h2>
        <input
          className={styles.id}
          type="number"
          name="id"
          defaultValue={id}
        />
        <Input
          type="text"
          placeholder="Insert title"
          id="title"
          label="Title"
        />

        {/* <label htmlFor="title">
        Title
        <input
          type="text"
          placeholder="Insert title"
          name="title"
          id="title"
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
          value={title}
        />
      </label> */}
        {/* <label htmlFor="text">
          Text
          <input
            type="textarea"
            name="text"
            placeholder="text"
            id="text"
            onChange={(event) => {
              setText(event.currentTarget.value);
            }}
            value={text}
          />
        </label> */}
        {/* <label htmlFor="path">
          Path
          <input
            type="text"
            name="path"
            id="path"
            placeholder="Insert path"
            onChange={(event) => {
              setPath(event.currentTarget.value);
            }}
            value={path}
          />
        </label> */}

        <button onClick={cancelHandler}>Cancel</button>
        <button onClick={onSubmit}>Salvar</button>
      </form>
    </FormProvider>
  );
}
