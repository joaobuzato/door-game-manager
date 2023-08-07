import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <h2 className={styles.title}>Door Game Manager</h2>
      <p className={styles.paragraph}>
        {`Esta é a página principal da Door Game Manager, um projeto pessoal de João Pedro Buzato, que visa ser uma forma fácil de se desenvolver um jogo em texto. `}
      </p>
    </>
  );
}
