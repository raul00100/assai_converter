import "@testing-library/jest-dom/vitest";
import { screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { renderWithRouter, renderCheck } from "./generalMock";
import TextSettings from "../settings/textSettings";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

describe("input", () => {
  it("renders textarea", () => {
    renderCheck({ testId: "text-input", component: <TextSettings /> });
  });

  it("calls setInput when typing", async () => {
    const user = userEvent.setup();
    const setInput = vi.fn();
    renderWithRouter(<TextSettings input="" setInput={setInput} />);
    const input = screen.getByTestId("text-input");

    await user.type(input, "hello");
    expect(setInput).toHaveBeenCalled();
    expect(setInput).toHaveBeenCalledWith("h");
  });

  it("shows the value passed via props", () => {
    renderWithRouter(<TextSettings input="test" />);
    const input = screen.getByTestId("text-input") as HTMLTextAreaElement;
    expect(input.value).toBe("test");
  });
});

vi.mock("react-colorful", () => ({
  HexColorPicker: ({ onChange }: { onChange: (color: string) => void }) => (
    <div data-testid="color-picker" onClick={() => onChange("#ffffff")} />
  ),
}));

describe("color picker", () => {
  it("renders selector", () => {
    renderCheck({ testId: "size-selector", component: <TextSettings /> });
  });

  it("toggles color picker", async () => {
    const user = userEvent.setup();
    const setShowColors = vi.fn();
    renderWithRouter(
      <TextSettings showColors={false} setShowColors={setShowColors} />
    );

    const button = screen.getByTestId("picker-toggle");
    await user.click(button);

    expect(setShowColors).toHaveBeenCalled();
  });

  it("changes color", async () => {
    const user = userEvent.setup();
    const setTextColor = vi.fn();
    renderWithRouter(
      <TextSettings
        textColor="#000000"
        setTextColor={setTextColor}
        showColors={true}
      />
    );

    const toggle = screen.getByTestId("picker-toggle");
    await user.click(toggle);

    const picker = screen.getByTestId("color-picker");
    await user.click(picker);

    expect(setTextColor).toHaveBeenLastCalledWith("#ffffff");
  });
});
