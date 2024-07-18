import { usernameServiceFactory } from "./index.js";

import { describe, bench } from "vitest";

describe("username service", () => {
  describe("generateUsername", () => {});
});

bench(
  "generate-thousand-usernames",
  () => {
    const { generateUsername } = usernameServiceFactory();
    generateUsername();
  },
  { iterations: 1000, time: 1000 },
);
