import "@testing-library/jest-dom/vitest";
import { screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { renderCheck, renderWithRouter } from "./generalMock";
import userEvent from "@testing-library/user-event";
import ImageSettings from "../settings/imageSettings";
import VideoSettings from "../settings/videoSettings";

afterEach(() => {
  cleanup();
});

async function switchCheck({ testId = "" }) {
  const user = userEvent.setup();
  const setInvert = vi.fn();
  const setColored = vi.fn();

  if (testId === "invert-img") {
    renderWithRouter(<ImageSettings invert={false} setInvert={setInvert} />);
  } else if (testId === "colored-img") {
    renderWithRouter(<ImageSettings colored={false} setColored={setColored} />);
  } else if (testId === "invert-vid") {
    renderWithRouter(<VideoSettings invert={false} setInvert={setInvert} />);
  } else if (testId === "colored-vid") {
    renderWithRouter(<VideoSettings colored={false} setColored={setColored} />);
  }

  const swtch = screen.getByTestId(testId);
  await user.click(swtch);

  if (testId === "invert-img" || testId === "invert-vid") {
    expect(setInvert).toHaveBeenCalledWith(expect.any(Function));
  } else if (testId === "colored-img" || testId === "colored-vid") {
    expect(setColored).toHaveBeenCalledWith(expect.any(Function));
  }
}

describe("invert switch /image", () => {
  it("renders switch", () => {
    renderCheck({ testId: "invert-img", component: <ImageSettings /> });
  });

  it("calls setInvert when toggle", async () => {
    await switchCheck({ testId: "invert-img" });
  });
});

describe("colored switch /image", () => {
  it("renders switch", () => {
    renderCheck({ testId: "colored-img", component: <ImageSettings /> });
  });

  it("calls setColored when toggle", async () => {
    await switchCheck({ testId: "colored-img" });
  });
});

describe("invert switch /video", () => {
  it("renders switch", () => {
    renderCheck({ testId: "invert-vid", component: <VideoSettings /> });
  });
  it("calls setInvert when toggle", async () => {
    await switchCheck({ testId: "invert-vid" });
  });
});

describe("colored switch /video", () => {
  it("renders switch", () => {
    renderCheck({ testId: "colored-vid", component: <VideoSettings /> });
  });

  it("calls setColored when toggle", async () => {
    await switchCheck({ testId: "colored-vid" });
  });
});
