import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";
import styles from "./Input.module.css";
import React from "react";

describe("UI Input", () => {
  const props = {
    label: "label",
    hidden: false,
    type: "text",
    placeholder: "placeholder",
    id: "input-id",
    value: "",
    onChange: jest.fn(),
  };

  afterEach(props.onChange.mockClear());
  test("Should render Input correctly", async () => {
    render(<Input {...props}></Input>);

    const label = await screen.findByTestId(props.id);
    const input = await screen.findByLabelText("label");

    expect(label).not.toHaveClass(styles.hidden);

    expect(input).not.toBeDisabled();
    expect(input).toHaveValue("");
    expect(input).toHaveProperty("placeholder", "placeholder");
    fireEvent.change(input, {
      target: { value: "texting" },
    });
    expect(props.onChange).toBeCalledWith(props.id, "texting", true);
    expect(input).toHaveValue("texting");
  });
  test("Should render Input when hidden = true correctly", async () => {
    const hiddenProps = { ...props, hidden: true };
    render(<Input {...hiddenProps}></Input>);

    const label = await screen.findByTestId(props.id);
    const input = await screen.findByLabelText("label");

    expect(label).toHaveClass(styles.hidden);

    expect(input).not.toBeDisabled();
    expect(input).toHaveValue("");
    expect(input).toHaveProperty("placeholder", "placeholder");
    expect(input).toHaveProperty("id", "input-id");
  });
  describe("Should validate properly Input correctly", () => {
    test("Should validate required input", async () => {
      const validation = { required: true, minLength: 2, maxLength: 10 };
      const validateProps = { ...props, validation };
      render(<Input {...validateProps}></Input>);
      const input = await screen.findByLabelText("label");

      //required = true
      fireEvent.change(input, {
        target: { value: "" },
      });
      expect(props.onChange).toBeCalledWith(props.id, "", false);
      //minLength = 2
      fireEvent.change(input, {
        target: { value: "v" },
      });
      expect(props.onChange).toBeCalledWith(props.id, "v", false);
      //maxLength = 10
      fireEvent.change(input, {
        target: { value: "pelo amor de deus pelo amor de deus" },
      });
      expect(props.onChange).toBeCalledWith(
        props.id,
        "pelo amor de deus pelo amor de deus",
        false
      );
      //valid input!
      fireEvent.change(input, {
        target: { value: "valid" },
      });
      expect(props.onChange).toBeCalledWith(props.id, "valid", true);
    });
  });
});
