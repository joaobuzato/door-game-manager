import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("/endpoint", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ body: "hello there" }));
  })
);

describe("UI Form", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
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
});
