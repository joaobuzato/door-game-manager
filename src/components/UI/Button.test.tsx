import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import React from "react";

describe("UI Button", () => {
  test("Button", async () => {
    const props = {
      value: "botao",
      onClick: jest.fn(),
      children: <></>,
      className: "classe-botao",
    };
    render(<Button {...props}></Button>);
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveValue("botao");

    await fireEvent.click(button);

    expect(props.onClick).toBeCalledTimes(1);
  });
});
