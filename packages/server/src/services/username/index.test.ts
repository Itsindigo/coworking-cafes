import { describe, assert, it } from "vitest";
import { usernameServiceFactory } from "./index.js";

describe("username service", () => {
  const { generateUsername } = usernameServiceFactory();
  describe("generateUsername", () => {
    it("should create a patterned username", () => {
      for (let i = 0; i < 1000; i++) {
        const regex = /^(?:[a-z]+-)+\d{1,4}$/;
        assert.match(generateUsername(), regex);
      }
    });
  });
});
