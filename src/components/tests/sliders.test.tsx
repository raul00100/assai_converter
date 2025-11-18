import "@testing-library/jest-dom/vitest";
import { screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { renderWithRouter } from "./generalMock";
import { renderCheck } from "./generalMock";
import ImageSettings from "../settings/imageSettings";
import VideoSettings from "../settings/videoSettings";

afterEach(() => {
  cleanup();
});

function switchCheck({ testId = "" }) {
  const setArtSize = vi.fn();
  if (testId === "image-slider") {
    renderWithRouter(<ImageSettings artSize={50} setArtSize={setArtSize} />);
  } else if (testId === "video-slider") {
    renderWithRouter(<VideoSettings artSize={50} setArtSize={setArtSize} />);
  }

  screen.getByTestId("mock-slider").click();

  expect(setArtSize).toHaveBeenCalledTimes(1);
  expect(setArtSize).toHaveBeenCalledWith(51);
}

vi.mock("rc-slider", () => ({
  default: ({ onChange }: { onChange: (value: number) => void }) => (
    <button data-testid="mock-slider" onClick={() => onChange(51)} />
  ),
}));

//gotta check the render of the div container in which the slider is placed
// because of this bitchass mock function that not allow to find a shit by role (rc-slider doesn't support a testid)

describe("slider on /image", () => {
  it("renders slider", () => {
    renderCheck({ testId: "image-slider", component: <ImageSettings /> });
  });
  it("calls setArtSize onChange", () => {
    switchCheck({ testId: "image-slider" });
  });
});

describe("slider on /video", () => {
  it("renders slider", () => {
    renderCheck({ testId: "video-slider", component: <VideoSettings /> });
  });
  it("calls setArtSize onChange", () => {
    switchCheck({ testId: "video-slider" });
  });
});
