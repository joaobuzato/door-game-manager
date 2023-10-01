import { Room } from "../../types";
import ListDoor from "../Door/ListDoor";
import Form from "../UI/Form";

export default function RoomForm(props: {
  room?: Room;
  closeForm: Function;
  validate: Function;
}) {
  const formInputs = [
    {
      id: "title",
      label: "Title:",
      type: "text",
      placeholder: "Enter the title",
      value: props.room ? props.room.title : "",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
    },
    {
      id: "text",
      label: "Text:",
      type: "text",
      placeholder: "Enter the text",
      value: props.room ? props.room.text : "",
      validation: {
        required: true,
      },
    },
    {
      id: "path",
      label: "Path:",
      type: "text",
      placeholder: "Enter the path",
      value: props.room ? props.room.path : "",
      validation: {
        required: true,
      },
    },
  ];

  const cancelHandler = () => {
    props.closeForm();
  };

  return (
    <div>
      <h1>{props.room ? "Edit Room" : "Insert Room"}</h1>
      <Form
        onCancelCallback={cancelHandler}
        onSuccessCallback={cancelHandler}
        onErrorCallback={cancelHandler}
        formId="roomForm"
        endpoint="/rooms"
        entityId={props.room ? props.room.id : 0}
        inputs={formInputs}
      />
      {props.room && (
        <ListDoor
          roomId={props.room?.id ?? 0}
          doors={props.room?.doors ?? []}
        ></ListDoor>
      )}
    </div>
  );
}
