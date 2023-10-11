import Header from "./Header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
describe("Header", () => {
  test("should render header", async () => {
    render(<Header></Header>);
    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toBe("Door Game Manager");
  });
});
