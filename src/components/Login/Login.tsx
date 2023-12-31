import React, { useContext } from "react";

import styles from "./Login.module.css";
import Form from "../UI/Form";
import AuthContext from "../../store/AuthContext";

import Modal from "../UI/Modal";

const Login = () => {
  const context = useContext(AuthContext);
  const formInputs = [
    {
      id: "username",
      label: "Username: ",
      type: "text",
      placeholder: "Enter your username",
      value: "",
      validation: {
        required: true,
      },
    },
    {
      id: "password",
      label: "Password: ",
      type: "password",
      placeholder: "Enter your password",
      value: "",
      validation: {
        required: true,
      },
    },
    // Add more input configurations as needed
  ];
  return (
    <Modal>
      <div className={styles.login}>
        <h2>Entrar</h2>
        <Form
          onSuccessCallback={(response: any) => {
            context.onLogin(response);
          }}
          onErrorCallback={(response: any) => {
            alert("Erro ao fazer login");
          }}
          onCancelCallback={() => {
            console.log("Faça o login");
          }}
          formId="login"
          endpoint="/auth"
          inputs={formInputs}
          entityId={0}
          saveButtonText="Login"
        />
      </div>
    </Modal>
  );
};

export default Login;
