import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "./Navigation";
import AuthContext, { AuthContextProvider } from "../../store/AuthContext";

describe("Navigation", () => {
  test("should show nav without button when unlogged", () => {
    render(
      <AuthContextProvider>
        <Navigation></Navigation>
      </AuthContextProvider>
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  test("should show nav with button when logged", () => {
    document.cookie = "door_game_token=asdasdasd";
    render(
      <AuthContextProvider>
        <Navigation></Navigation>
      </AuthContextProvider>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
