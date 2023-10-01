import { useState } from "react";
import Input, { ValidationOpts } from "./Input";
import { editItem, saveItem } from "../../clients/doorApiClient";
import styles from "./Form.module.css";

type FormProps = {
  saveButtonText?: string;
  cancelButtonText?: string;
  onCancelCallback: Function;
  onSuccessCallback: Function;
  onErrorCallback: Function;
  endpoint: string;
  formId: string;
  entityId: number;
  errorMsg?: string;
  inputs: {
    label: string;
    type: string;
    placeholder: string;
    id: string;
    hidden?: boolean;
    value: string;

    validation?: ValidationOpts;
  }[];
};
type InputValidity = { id: string; isValid: boolean; value: string }[];

export default function Form({
  saveButtonText,
  cancelButtonText,
  onCancelCallback,
  onSuccessCallback,
  onErrorCallback,
  endpoint,
  entityId,
  formId,
  inputs,
}: FormProps) {
  const [isFormValid, setIsFormValid] = useState(false);
  let formState: InputValidity = inputs.map((input) => {
    return { id: input.id, value: input.value, isValid: false };
  });

  const inputChangeHandler = (id: string, value: string, isValid: boolean) => {
    formState = formState.map((item) => {
      return item.id === id ? { id: id, value: value, isValid: isValid } : item;
    });
    verifyFormValid(formState);
  };

  const verifyFormValid = (formState: InputValidity) => {
    for (const input of formState) {
      if (!input.isValid) {
        setIsFormValid(false);
        return;
      }
    }
    setIsFormValid(true);
  };

  const format = (formState: InputValidity) => {
    const result: { [key: string]: string } = {};
    for (const input of formState) {
      result[input.id] = input.value;
    }
    return { ...result };
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const body = format(formState);
    if (entityId > 0) {
      editItem(endpoint, entityId, body, onSuccessCallback, onErrorCallback);
    } else {
      saveItem(endpoint, body, onSuccessCallback, onErrorCallback);
    }
  };

  const handleCancel = (event: any) => {
    event?.preventDefault();
    onCancelCallback();
  };

  return (
    <form className={styles.form} id={formId} onSubmit={handleSubmit}>
      {inputs.map((input) => {
        return (
          <Input
            hidden={input.hidden}
            key={input.id}
            label={input.label}
            type={input.type}
            placeholder={input.placeholder}
            id={input.id}
            value={input.value}
            onChange={inputChangeHandler}
            validation={input.validation}
          ></Input>
        );
      })}

      <button type="submit" disabled={!isFormValid}>
        {saveButtonText ?? "Salvar"}
      </button>
      <button type="button" onClick={handleCancel}>
        {cancelButtonText ?? "Cancelar"}
      </button>
    </form>
  );
}
