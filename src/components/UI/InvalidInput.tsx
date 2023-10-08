import styles from "./InvalidInput.module.css";
import React from "react";

export default function InvalidInput(props: { message: string }) {
  return (
    <div className={styles.tooltip}>
      !
      <div className={styles.tooltiptext}>
        <p key={props.message}>{props.message}</p>
      </div>
    </div>
  );
}
