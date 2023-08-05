// import styles from "./RoomForm.module.css";
import { Room } from "../../types";
import Form from "../UI/Form";
// import { useState } from "react";
// import Http from "../../http/Http";
// import Input from "../UI/Input";

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
    // Add more input configurations as needed
  ];

  const cancelHandler = () => {
    props.closeForm();
  };

  return (
    <div>
      <h1>My Form</h1>
      <Form
        closeForm={cancelHandler}
        formId="roomForm"
        endpoint="/rooms"
        entityId={props.room ? props.room.id : 0}
        inputs={formInputs}
      />
    </div>
  );
}
