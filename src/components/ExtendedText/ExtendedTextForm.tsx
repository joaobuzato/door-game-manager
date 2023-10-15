import { ExtendedText } from "../../types";
import Form from "../UI/Form";
import React from "react";

export default function ExtendedTextForm(props: {
  roomId: number;
  extendedText?: ExtendedText;
  closeForm: Function;
  validate?: Function;
}) {
  const formInputs = [
    {
      id: "sentence",
      label: "Sentence: ",
      type: "text",
      placeholder: "Enter the sentence",
      value: props.extendedText ? props.extendedText.sentence : "",
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
      value: props.extendedText ? props.extendedText.text : "",
      validation: {
        required: false,
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
      <h3>
        {props.extendedText ? "Edit ExtendedText" : "Insert ExtendedText"}
      </h3>
      <Form
        onCancelCallback={cancelHandler}
        onSuccessCallback={cancelHandler}
        onErrorCallback={cancelHandler}
        formId="extendedTextForm"
        endpoint="/extendedTexts"
        entityId={props.extendedText ? props.extendedText.id : 0}
        inputs={formInputs}
      />
    </div>
  );
}
