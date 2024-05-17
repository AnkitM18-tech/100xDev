import { describe, expect, test, it } from "@jest/globals";
import { multiply, sum } from "../index";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("adds 9 + 2 to equal 11", () => {
    expect(sum(9, 2)).toBe(11);
  });
});

describe("multiply module", () => {
  test("multiplies 3 * 2 to equal 6", () => {
    expect(multiply(3, 2)).toBe(6);
  });
  it("multiplies 3 * 8 to equal 24", () => {
    expect(multiply(3, 8)).toBe(24);
  });
});
