import "@testing-library/jest-dom/vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

export function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

export function renderCheck({
  testId = "",
  component: Component,
}: {
  testId?: string;
  component: React.ReactElement;
}) {
  renderWithRouter(Component);
  if (testId === "slider") {
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
  } else {
    const element = screen.getByTestId(testId);
    expect(element).toBeInTheDocument();
  }
}
