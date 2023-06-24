import { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      value={props.value}
      className={styles.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
