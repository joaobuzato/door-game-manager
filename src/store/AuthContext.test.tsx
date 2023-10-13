import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AuthContext, { AuthContextProvider } from "./AuthContext";
import * as cookieService from "../cookie/cookieService";
import "@testing-library/jest-dom";

describe("AuthContext", () => {
  let getCookieSpy: jest.SpyInstance;
  let setCookieSpy: jest.SpyInstance;
  let eraseCookieSpy: jest.SpyInstance;

  beforeEach(() => {
    getCookieSpy = jest.spyOn(cookieService, "getCookie");
    setCookieSpy = jest.spyOn(cookieService, "setCookie");
    eraseCookieSpy = jest.spyOn(cookieService, "eraseCookie");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should set isLoggedIn to true if the token exists", () => {
    getCookieSpy.mockReturnValue("mock_token");

    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {({ isLoggedIn }) => (
            <div>{isLoggedIn ? "Logged In" : "Logged Out"}</div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    expect(screen.getByText("Logged In")).toBeInTheDocument();
  });

  test("should set isLoggedIn to false if the token does not exist", () => {
    getCookieSpy.mockReturnValue(undefined);

    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {({ isLoggedIn }) => (
            <div>{isLoggedIn ? "Logged In" : "Logged Out"}</div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    expect(screen.getByText("Logged Out")).toBeInTheDocument();
  });

  test("should set isLoggedIn to true after logging in", () => {
    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {({ isLoggedIn, onLogin }) => (
            <div>
              <button onClick={() => onLogin({ token: "mock_token" })}>
                Login
              </button>
              {isLoggedIn ? "Logged In" : "Logged Out"}
            </div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    expect(setCookieSpy).toHaveBeenCalledWith(
      "door_game_token",
      "mock_token",
      1
    );
    expect(screen.getByText("Logged In")).toBeInTheDocument();
  });

  test("should set isLoggedIn to false after logging out", () => {
    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {({ isLoggedIn, onLogout }) => (
            <div>
              <button onClick={onLogout}>Logout</button>
              {isLoggedIn ? "Logged In" : "Logged Out"}
            </div>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(eraseCookieSpy).toHaveBeenCalledWith("door_game_token");
    expect(screen.getByText("Logged Out")).toBeInTheDocument();
  });

  test("should call setCookie with the correct parameters on login", () => {
    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {({ onLogin }) => (
            <button onClick={() => onLogin({ token: "mock_token" })}>
              Login
            </button>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    expect(setCookieSpy).toHaveBeenCalledWith(
      "door_game_token",
      "mock_token",
      1
    );
  });

  test("should call eraseCookie with the correct parameters on logout", () => {
    render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {({ onLogout }) => <button onClick={onLogout}>Logout</button>}
        </AuthContext.Consumer>
      </AuthContextProvider>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(eraseCookieSpy).toHaveBeenCalledWith("door_game_token");
  });
});
