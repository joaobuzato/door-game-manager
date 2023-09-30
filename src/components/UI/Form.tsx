import { useState } from "react";
import Input, { ValidationOpts } from "./Input";
import Http from "../../http/Http";
import { getCookie } from "../../cookie/cookieService";

type FormProps = {
  saveButtonText?: string;
  cancelButtonText?: string;
  onCancelCallback: Function;
  onSuccessCallback: Function;
  endpoint: string;
  formId: string;
  entityId: number;
  errorMsg?: string;
  inputs: {
    label: string;
    type: string;
    placeholder: string;
    id: string;
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
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const body = format(formState);
    if (entityId > 0) {
      Http.put(endpoint, entityId, body, {
        authorization: getCookie("door_game_token") ?? "",
      })
        .then((response) => {
          if (response.status === 403) {
            alert("faça o login novamente.");
            return;
          }
          if (response.status > 300) {
            alert("Alguma coisa deu errada ao salvar.");
            return;
          }
          onSuccessCallback(response);
        })
        .catch((error) => {
          alert("Alguma coisa deu errado.");
        });
    } else {
      Http.post(endpoint, body, {
        authorization: getCookie("door_game_token") ?? "",
      })
        .then((response) => {
          if (response.status === 403) {
            alert("faça o login novamente.");
            return;
          }
          if (response.status > 300) {
            alert("Alguma coisa deu errada ao salvar.");
            return;
          }
          onSuccessCallback(response);
        })
        .catch((error) => {
          alert("Alguma coisa deu errado.");
        });
    }
  };

  const handleCancel = (event: any) => {
    event?.preventDefault();
    onCancelCallback();
  };

  const format = (formState: InputValidity) => {
    const result: { [key: string]: string } = {};
    for (const input of formState) {
      result[input.id] = input.value;
    }
    return { ...result };
  };
  return (
    <form id={formId} onSubmit={handleSubmit}>
      {inputs.map((input) => {
        return (
          <Input
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
