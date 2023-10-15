import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";
describe("Modal component", () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "overlay-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });

  test("renders without crashing", () => {
    const onCloseModal = jest.fn();
    render(<Modal onCloseModal={onCloseModal}>Test Modal Content</Modal>);
  });

  test("calls onCloseModal when clicking on the backdrop", () => {
    const onCloseModal = jest.fn();
    render(<Modal onCloseModal={onCloseModal}>Test Modal Content</Modal>);
    const backdrop = screen.getByTestId("backdrop");
    fireEvent.click(backdrop);
    expect(onCloseModal).toHaveBeenCalled();
  });

  test("renders the modal content correctly", () => {
    render(<Modal onCloseModal={jest.fn()}>Test Modal Content</Modal>);
    expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
  });
});
