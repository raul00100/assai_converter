import "@testing-library/jest-dom/vitest";
import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { renderWithRouter, renderCheck } from "./generalMock";
import { describe, it, expect, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TextSettings from "../settings/textSettings";
import ImageSettings from "../settings/imageSettings";
import VideoSettings from "../settings/videoSettings";

afterEach(() => {
  cleanup();
});

async function selectorTest({ testId = "", text = "" }) {
  const user = userEvent.setup();
  const setFont = vi.fn();
  const setTextSize = vi.fn();
  const setChars = vi.fn();

  if (testId === "font-selector") {
    renderWithRouter(<TextSettings font="" setFont={setFont} />);
  } else if (testId === "size-selector") {
    renderWithRouter(<TextSettings textSize="" setTextSize={setTextSize} />);
  } else if (testId === "char-selector-img") {
    renderWithRouter(<ImageSettings chars="" setChars={setChars} />);
  } else if (testId === "char-selector-vid") {
    renderWithRouter(<VideoSettings chars="" setChars={setChars} />);
  }

  const trigger = screen.getByTestId(testId);
  await user.click(trigger);

  const item = screen.getByText(text);
  await user.click(item);

  if (testId === "font-selector") {
    expect(setFont).toHaveBeenLastCalledWith(text);
  } else if (testId === "size-selector") {
    expect(setTextSize).toHaveBeenCalledWith(text);
  } else {
    expect(setChars).toHaveBeenCalledWith(text);
  }
}

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

describe("font style", () => {
  it("renders selector", () => {
    renderCheck({ testId: "font-selector", component: <TextSettings /> });
  });

  it("selects font", async () => {
    await selectorTest({ testId: "font-selector", text: "Banner" });
  });
});

describe("text size", () => {
  it("renders selector", () => {
    renderCheck({ testId: "size-selector", component: <TextSettings /> });
  });

  it("selects text size", async () => {
    await selectorTest({
      testId: "size-selector",
      text: "18px",
    });
  });
});

describe("chars image", () => {
  it("renders selector", () => {
    renderCheck({ testId: "char-selector-img", component: <ImageSettings /> });
  });

  it("selects char style", async () => {
    await selectorTest({ testId: "char-selector-img", text: "digitalChars" });
  });
});

describe("chars video", () => {
  it("renders selector", () => {
    renderCheck({ testId: "char-selector-vid", component: <VideoSettings /> });
  });

  it("selects char style", async () => {
    await selectorTest({ testId: "char-selector-vid", text: "digitalChars" });
  });
});
