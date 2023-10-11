import React, { useEffect, useState } from "react";
import InvalidInput from "./InvalidInput";
import styles from "./Input.module.css";

export type ValidationOpts = {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
};

export default function Input(props: {
  label: string;
  hidden?: boolean;
  type: string;
  placeholder: string;
  id: string;
  value: string;
  validation?: ValidationOpts;
  onChange: Function;
}) {
  const [value, setValue] = useState(props.value);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    validate(event.currentTarget.value);
    setValue(event.currentTarget.value);
  };

  const validate = (value: string) => {
    if (props.validation?.required && !value) {
      setIsValid(false);
      setErrorMessage("Campo Obrigatório");
      props.onChange(props.id, value, false);
      return;
    } else {
      setIsValid(true);
      setErrorMessage("");
    }

    if (
      props.validation?.maxLength &&
      value.length > props.validation.maxLength
    ) {
      setIsValid(false);
      setErrorMessage(`Máximo de ${props.validation.maxLength} caracteres`);
      props.onChange(props.id, value, false);
      return;
    } else {
      setIsValid(true);
      setErrorMessage("");
    }

    if (
      props.validation?.minLength &&
      value.length < props.validation.minLength
    ) {
      setIsValid(false);
      setErrorMessage(`Mínimo de ${props.validation.minLength} caracteres`);
      props.onChange(props.id, value, false);
      return;
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
    props.onChange(props.id, value, true);
  };

  useEffect(() => {
    validate(value);
  });

  return (
    <div className={styles.inputContainer}>
      <label
        data-testid={props.id}
        htmlFor={props.id}
        className={`${styles.label} ${props.hidden ? styles.hidden : ""}`}
      >
        {props.label}
        <input
          className={styles.input}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={value}
          onChange={changeHandler}
        ></input>
      </label>
      {!isValid && <InvalidInput message={errorMessage}></InvalidInput>}
    </div>
  );
}
