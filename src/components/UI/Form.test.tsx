import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import React from "react";
import { saveItem, editItem } from "../../clients/doorApiClient";
jest.mock("../../clients/doorApiClient", () => {
  return {
    saveItem: jest.fn(),
    editItem: jest.fn(),
  };
});

describe("UI Form", () => {
  test("Should contain all the buttons", async () => {
    const props = {
      saveButtonText: "botao-salvar",
      cancelButtonText: "botao-cancelar",
      onCancelCallback: jest.fn(),
      onSuccessCallback: jest.fn(),
      onErrorCallback: jest.fn(),
      endpoint: "/endpoint",
      formId: "form-id",
      entityId: 1,
      errorMsg: "errorMessage",
      inputs: [],
    };
    render(<Form {...props}></Form>);
    expect(
      screen.getByRole("button", { name: /botao-salvar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /botao-cancelar/i })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /botao-cancelar/i }));
    expect(props.onCancelCallback).toBeCalledTimes(1);
  });

  test("Should render an input, change values and save correctly", async () => {
    const props = {
      saveButtonText: "botao-salvar",
      cancelButtonText: "botao-cancelar",
      onCancelCallback: jest.fn(),
      onSuccessCallback: jest.fn(),
      onErrorCallback: jest.fn(),
      endpoint: "/endpoint",
      formId: "form-id",
      entityId: 0,
      errorMsg: "errorMessage",
      inputs: [
        {
          id: "path",
          label: "Path:",
          type: "text",
          placeholder: "Enter the path",
          value: "",
          validation: {
            required: true,
            minLength: 1,
            maxLength: 5,
          },
        },
        {
          id: "text",
          label: "Text: ",
          type: "text",
          placeholder: "Enter the text",
          value: "value",
          validation: {
            required: false,
          },
        },
      ],
    };
    render(<Form {...props}></Form>);
    //valida se os inputs apareceram
    expect((await screen.findAllByRole("textbox")).length).toBe(2);
    expect(
      screen.getByRole("button", { name: /botao-salvar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /botao-salvar/i })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /botao-cancelar/i })
    ).toBeInTheDocument();
    const pathInput = screen.getByLabelText("Path:");

    fireEvent.change(pathInput, { target: { value: "path" } });

    expect(
      screen.getByRole("button", { name: /botao-salvar/i })
    ).not.toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /botao-salvar/i }));
    expect(saveItem).toBeCalledTimes(1);
    expect(saveItem).toBeCalledWith(
      props.endpoint,
      { path: "path", text: "value" },
      props.onSuccessCallback,
      props.onErrorCallback
    );
  });

  test("Should render an input and edit correctly", async () => {
    const props = {
      saveButtonText: "botao-salvar",
      cancelButtonText: "botao-cancelar",
      onCancelCallback: jest.fn(),
      onSuccessCallback: jest.fn(),
      onErrorCallback: jest.fn(),
      endpoint: "/endpoint",
      formId: "form-id",
      entityId: 1,
      errorMsg: "errorMessage",
      inputs: [
        {
          id: "path",
          label: "Path:",
          type: "text",
          placeholder: "Enter the path",
          value: "path",
          validation: {
            required: true,
            minLength: 1,
            maxLength: 5,
          },
        },
        {
          id: "text",
          label: "Text: ",
          type: "text",
          placeholder: "Enter the text",
          value: "value",
          validation: {
            required: false,
          },
        },
      ],
    };
    render(<Form {...props}></Form>);

    fireEvent.click(screen.getByRole("button", { name: /botao-salvar/i }));
    expect(editItem).toBeCalledTimes(1);
    expect(editItem).toBeCalledWith(
      props.endpoint,
      1,
      { path: "path", text: "value" },
      props.onSuccessCallback,
      props.onErrorCallback
    );
  });
});
