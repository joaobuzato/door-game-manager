import { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";
import React from "react";

type ButtonProps = {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      value={props.value}
      className={`${styles.button} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
