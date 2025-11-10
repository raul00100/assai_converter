import "@testing-library/jest-dom/vitest";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import CopyDownload from "../functions/copyDownload";
import { describe, it, expect, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

async function testFunction({ path = "/", testId = "" }) {
  const user = userEvent.setup();

  const createObjectURL = vi.fn(() => "blob:fake-url");
  const revokeObjectURL = vi.fn();

  vi.spyOn(URL, "createObjectURL").mockImplementation(createObjectURL);
  vi.spyOn(URL, "revokeObjectURL").mockImplementation(revokeObjectURL);

  const appendChildSpy = vi.spyOn(document.body, "appendChild");
  const removeChildSpy = vi.spyOn(document.body, "removeChild");

  const origCreateElement = document.createElement.bind(document);
  let clickSpy: (() => void) | null = null;

  vi.spyOn(document, "createElement").mockImplementation(
    (tagName, options?) => {
      const el = origCreateElement(tagName, options);
      if (tagName === "a") {
        clickSpy = vi.fn();
        vi.spyOn(el as HTMLAnchorElement, "click").mockImplementation(clickSpy);
      }
      return el;
    }
  );

  const refText = {
    current: document.createElement("pre"),
  } as React.RefObject<HTMLPreElement>;
  const refArt = {
    current: document.createElement("pre"),
  } as React.RefObject<HTMLPreElement>;

  render(
    <MemoryRouter initialEntries={[path]}>
      {path === "/text" ? (
        <CopyDownload ascii="sample ascii text" refText={refText} />
      ) : (
        <CopyDownload asciiArt="sample ascii art" refArt={refArt} />
      )}
    </MemoryRouter>
  );

  const button = screen.getByTestId(testId);
  await user.click(button);

  expect(createObjectURL).toHaveBeenCalled();
  expect(clickSpy).not.toBeNull();
  expect(clickSpy!).toHaveBeenCalled();
  expect(appendChildSpy).toHaveBeenCalled();
  expect(removeChildSpy).toHaveBeenCalled();
  expect(revokeObjectURL).toHaveBeenCalled();
}

describe("copy", () => {
  it("renders copy button", () => {
    renderWithRouter(<CopyDownload />);
    const button = screen.getByTestId("copy");
    expect(button).toBeInTheDocument();
  });

  it("copies ascii when on /text route", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn();

    vi.stubGlobal("navigator", {
      clipboard: {
        writeText,
      },
    });

    render(
      <MemoryRouter initialEntries={["/text"]}>
        <CopyDownload ascii="hello" />
      </MemoryRouter>
    );

    const button = screen.getByTestId("copy");
    await user.click(button);

    expect(writeText).toHaveBeenCalledWith("hello");
  });

  it("copies asciiArt when on /image route", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn();

    vi.stubGlobal("navigator", {
      clipboard: {
        writeText,
      },
    });

    render(
      <MemoryRouter initialEntries={["/image"]}>
        <CopyDownload asciiArt="art123" />
      </MemoryRouter>
    );

    const button = screen.getByTestId("copy");
    await user.click(button);

    expect(writeText).toHaveBeenCalledWith("art123");
  });
});

describe("download txt", () => {
  it("renders button", () => {
    renderWithRouter(<CopyDownload />);
    const button = screen.getByTestId("download-txt");
    expect(button).toBeInTheDocument();
  });

  it("download /text", async () => {
    await testFunction({ path: "/text", testId: "download-txt" });
  });

  it("download /image", async () => {
    await testFunction({ path: "/image", testId: "download-txt" });
  });
});

describe("download html", () => {
  it("renders button", () => {
    renderWithRouter(<CopyDownload />);
    const button = screen.getByTestId("download-html");
    expect(button).toBeInTheDocument();
  });

  it("download /text", async () => {
    await testFunction({ path: "/text", testId: "download-html" });
  });

  it("download /image", async () => {
    await testFunction({ path: "/image", testId: "download-html" });
  });
});
