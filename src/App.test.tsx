import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { AuthContextProvider } from "./store/AuthContext";

describe("App", () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "overlay-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });
  test("should render login when user is not logged in", () => {
    render(
      <AuthContextProvider>
        <App></App>
      </AuthContextProvider>
    );
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 }).innerHTML).toBe("Entrar");
  });
  test("should not render login when user is logged in", () => {
    document.cookie = "door_game_token=asdasdasd";
    render(
      <AuthContextProvider>
        <App></App>
      </AuthContextProvider>
    );
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 }).innerHTML).toBe(
      "Door Game Manager"
    );
    const buttonElement = screen.getByRole("button", {
      name: "Rooms",
    });

    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 }).innerHTML).toBe(
      "Lista de quartos"
    );
  });
});
