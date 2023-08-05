import { useEffect, useState } from "react";
import Input, { ValidationOpts } from "./Input";
import Http from "../../http/Http";

type FormProps = {
  closeForm: Function;
  endpoint: string;
  formId: string;
  entityId: number;
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
  closeForm,
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
      console.log(input.isValid);

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
      Http.put(endpoint, entityId, body)
        .then(() => {
          closeForm();
          alert("Deu bom o PUT");
        })
        .catch((error) => {
          alert("Deu ruim o PUT" + error);
        });
    } else {
      Http.post(endpoint, body)
        .then(() => {
          closeForm();
          alert("Deu bom o POST");
        })
        .catch((error) => {
          alert("Deu ruim o POST" + error);
        });
    }
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
      {/* <input type="number" id="id" hidden>
        {entityId}
      </input> */}
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
        Salvar
      </button>
      <button
        onClick={() => {
          closeForm();
        }}
      >
        Cancelar
      </button>
    </form>
  );
}
