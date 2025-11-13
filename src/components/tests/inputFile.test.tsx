import "@testing-library/jest-dom/vitest";
import { screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { renderWithRouter, renderCheck } from "./generalMock";
import userEvent from "@testing-library/user-event";
import ImageSettings from "../settings/imageSettings";
import VideoSettings from "../settings/videoSettings";

afterEach(() => {
  cleanup();
});

async function inputCheck({ testId = "" }) {
  const user = userEvent.setup();
  const uploadImage = vi.fn();
  const uploadVideo = vi.fn();

  const file = new File(["some picha"], "test.png", { type: "image/png" });

  if (testId === "input-img") {
    renderWithRouter(<ImageSettings uploadImage={uploadImage} />);
  } else if (testId === "input-vid") {
    renderWithRouter(<VideoSettings uploadVideo={uploadVideo} />);
  }

  const input = screen.getByTestId(testId);
  await user.upload(input, file);

  if (testId === "input-img") {
    expect(uploadImage).toHaveBeenCalled();
  } else if (testId === "input-vid") {
    expect(uploadVideo).toHaveBeenCalled();
  }
}

describe("input file img", () => {
  it("renders input", () => {
    renderCheck({ testId: "input-img", component: <ImageSettings /> });
  });
  it("call uploadImage", async () => {
    await inputCheck({ testId: "input-img" });
  });
});

describe("input file vid", () => {
  it("renders input", () => {
    renderCheck({ testId: "input-vid", component: <VideoSettings /> });
  });
  it("calls uploadVideo", async () => {
    inputCheck({ testId: "input-vid" });
  });
});
