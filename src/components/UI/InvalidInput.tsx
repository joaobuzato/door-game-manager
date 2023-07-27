import styles from "./InvalidInput.module.css";

export default function InvalidInput(props: { messages: string[] }) {
  return (
    <div className={styles.tooltip}>
      !
      <div className={styles.tooltiptext}>
        {props.messages.map((message) => {
          return <p key={message}>{message}</p>;
        })}
      </div>
    </div>
  );
}
