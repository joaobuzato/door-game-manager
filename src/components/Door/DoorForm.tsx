import { Door } from "../../types";
import Form from "../UI/Form";

export default function DoorForm(props: {
  roomId: number;
  door?: Door;
  closeForm: Function;
  validate?: Function;
}) {
  const formInputs = [
    {
      id: "path",
      label: "Path:",
      type: "text",
      placeholder: "Enter the path",
      value: props.door ? props.door.path : "",
      validation: {
        required: true,
        minLength: 1,
        maxLength: 5,
      },
    },
    {
      id: "text",
      label: "Text: ",
      type: "text",
      placeholder: "Enter the text",
      value: props.door ? props.door.text : "",
      validation: {
        required: false,
      },
    },
    {
      id: "color",
      label: "Color:",
      type: "text",
      placeholder: "Enter the text",
      value: props.door?.color ?? "#000000",
      validation: {
        minLength: 1,
        maxLength: 7,
        required: true,
      },
    },
    {
      id: "room_id",
      label: "RoomId:",
      hidden: true,
      type: "text",
      placeholder: "Enter the RoomId: ",
      value: String(props.roomId),
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
      <h3>{props.door ? "Edit Door" : "Insert Door"}</h3>
      <Form
        onCancelCallback={cancelHandler}
        onSuccessCallback={cancelHandler}
        onErrorCallback={cancelHandler}
        formId="doorForm"
        endpoint="/doors"
        entityId={props.door ? props.door.id : 0}
        inputs={formInputs}
      />
    </div>
  );
}
