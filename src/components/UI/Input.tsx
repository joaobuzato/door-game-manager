import { useEffect, useState } from "react";
import InvalidInput from "./InvalidInput";

type ValidationOpts = {
  required: boolean;
  maxLength: number;
  minLength: number;
};

export default function Input(props: {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  value: string;
  validation?: ValidationOpts;
  handleChange: Function;
}) {
  const [value, setValue] = useState(props.value ?? "");
  const [isValid, setIsValid] = useState(false);
  const errorsMessages = ["errou", "faiô"];

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    props.handleChange(value);
    validate();
  };

  const validate = () => {
    props.validation?.required && !value ? setIsValid(false) : setIsValid(true);
    props.validation?.maxLength && !(value.length > props.validation.maxLength)
      ? setIsValid(false)
      : setIsValid(true);
    props.validation?.minLength && !(value.length < props.validation.minLength)
      ? setIsValid(false)
      : setIsValid(true);
  };

  useEffect(() => {
    validate();
  });

  return (
    <>
      <label htmlFor={props.id}>
        {props.label}
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={value}
          onChange={changeHandler}
        ></input>
      </label>
      {!isValid && <InvalidInput messages={errorsMessages}></InvalidInput>}
    </>
  );
}
