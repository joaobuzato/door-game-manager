import { useState } from "react";

export default function Input(props: {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  value: string | number;
  defaultValue?: string | number;
  handleChange: Function;
}) {
  const [value, setValue] = useState(props.value ?? "");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    props.handleChange(value);
  };
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
    </>
  );
}

export function InputError({ message }: { message: string }) {
  return <p>{message}</p>;
}
