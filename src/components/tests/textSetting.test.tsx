import "@testing-library/jest-dom/vitest";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import TextSettings from "../settings/textSettings";
import { describe, it, expect, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("input", () => {
  it("renders textarea", () => {
    renderWithRouter(<TextSettings />);
    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
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

vi.mock("../select", () => {
  return {
    // @ts-expect-error - mocking select api
    Select: ({ children, onValueChange }) => {
      const enrichedChildren = React.Children.map(children, (child) => {
        if (child.type?.name === "SelectContent") {
          const newContent = React.cloneElement(child, {
            children: React.Children.map(child.props.children, (grand) => {
              if (grand.type?.name === "SelectItem") {
                return React.cloneElement(grand, {
                  onValueChange,
                });
              }
              return grand;
            }),
          });
          return newContent;
        }
        return child;
      });

      return <div>{enrichedChildren}</div>;
    },

    // @ts-expect-error - mocking select api
    SelectTrigger: ({ children, ...props }) => (
      <button {...props}>{children}</button>
    ),

    // @ts-expect-error - mocking select api
    SelectContent: ({ children }) => <div>{children}</div>,

    // @ts-expect-error - mocking select api
    SelectItem: ({ children, value, onValueChange }) => (
      <div role="option" onClick={() => onValueChange?.(value)}>
        {children}
      </div>
    ),
    // @ts-expect-error - mocking select api
    SelectValue: ({ children }) => <span>{children}</span>,
  };
});

describe("font", () => {
  it("render selector", () => {
    renderWithRouter(<TextSettings />);
    const selector = screen.getByTestId("font-selector");
    expect(selector).toBeInTheDocument();
  });

  it("selects font", async () => {
    const user = userEvent.setup();
    const setFont = vi.fn();
    renderWithRouter(<TextSettings font="" setFont={setFont} />);

    const trigger = screen.getByTestId("font-selector");
    await user.click(trigger);

    const item = screen.getByText("Banner");
    await user.click(item);

    expect(setFont).toHaveBeenLastCalledWith("Banner");
  });
});

describe("text size", () => {
  it("renders selector", () => {
    renderWithRouter(<TextSettings />);
    const selector = screen.getByTestId("size-selector");
    expect(selector).toBeInTheDocument();
  });

  it("selects text size", async () => {
    const user = userEvent.setup();
    const setTextSize = vi.fn();
    renderWithRouter(<TextSettings textSize="" setTextSize={setTextSize} />);

    const trigger = screen.getByTestId("size-selector");
    await user.click(trigger);

    const item = screen.getByText("18px");
    await user.click(item);

    expect(setTextSize).toHaveBeenCalledWith("18px");
  });
});

vi.mock("react-colorful", () => ({
  HexColorPicker: ({ onChange }: { onChange: (color: string) => void }) => (
    <div data-testid="color-picker" onClick={() => onChange("#ffffff")} />
  ),
}));

describe("color picker", () => {
  it("renders color picker", () => {
    renderWithRouter(<TextSettings showColors={true} />);
    const picker = screen.getByTestId("color-picker");
    expect(picker).toBeInTheDocument();
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
