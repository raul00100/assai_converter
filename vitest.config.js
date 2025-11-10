import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
});

// npm install --save-dev vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom  jsdom
