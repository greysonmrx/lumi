import { expect, it, describe } from "vitest";

import { isNumber } from "./isNumber";

describe("[UTILS] - Is Number", () => {
  it("should be able to return 'true' for positive numbers", () => {
    expect(isNumber(10)).toBe(true);
  });

  it("should be able to return 'true' for zero", () => {
    expect(isNumber(0)).toBe(true);
  });

  it("should be able to return 'true' for decimal numbers", () => {
    expect(isNumber(123.5)).toBe(true);
  });

  it("should be able to return 'true' for negative decimal numbers", () => {
    expect(isNumber(-123.5)).toBe(true);
  });

  it("should be able to return 'true' for strings that represent numbers", () => {
    expect(isNumber("123")).toBe(true);
    expect(isNumber("123.45")).toBe(true);
  });

  it("should be able to return 'false' for strings", () => {
    expect(isNumber("Not a number")).toBe(false);
  });

  it("should be able to return 'false' for NaN", () => {
    expect(isNumber(NaN)).toBe(false);
  });

  it("should be able to return 'false' for boolean values", () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
  });

  it("should be able to return 'false' for null", () => {
    expect(isNumber(null)).toBe(false);
  });

  it("should be able to return 'false' for undefined", () => {
    expect(isNumber(undefined)).toBe(false);
  });

  it("should be able to return 'false' for objects", () => {
    expect(isNumber({})).toBe(false);
    expect(isNumber({ value: 123 })).toBe(false);
  });

  it("should be able to return 'false' for arrays", () => {
    expect(isNumber([])).toBe(false);
    expect(isNumber([123])).toBe(false);
  });

  it("should be able to return 'false' for functions", () => {
    expect(isNumber(() => {})).toBe(false);
  });
});
