import { expect, it, describe } from "vitest";

import { reverseFormatNumber } from "./reverseFormatNumber";

describe("[UTILS] - Reverse Format Number", () => {
  it("should be able to parse a simple number string", () => {
    expect(reverseFormatNumber("123")).toBe(123);
  });

  it("should be able to parse a number string with commas as thousand separators", () => {
    expect(reverseFormatNumber("1.234")).toBe(1234);
    expect(reverseFormatNumber("12.345.678")).toBe(12345678);
  });

  it("should be able to parse a number string with a currency symbol", () => {
    expect(reverseFormatNumber("R$123")).toBe(123);
  });

  it("should be able to parse a number string with currency symbol and commas", () => {
    expect(reverseFormatNumber("R$1.234")).toBe(1234);
    expect(reverseFormatNumber("R$12.345.678")).toBe(12345678);
  });

  it("should be able to parse a number string with a negative sign", () => {
    expect(reverseFormatNumber("-123")).toBe(-123);
  });

  it("should be able to parse a number string with parentheses for negative values", () => {
    expect(reverseFormatNumber("(R$-123)")).toBe(-123);
  });

  it("should be able to parse a number string with decimals", () => {
    expect(reverseFormatNumber("123,45")).toBe(123.45);
  });

  it("should be able to parse a number string with currency symbol, commas, and decimals", () => {
    expect(reverseFormatNumber("R$1.234,56")).toBe(1234.56);
  });

  it("should be able to parse a number string with negative sign, commas, and decimals", () => {
    expect(reverseFormatNumber("-1.234,56")).toBe(-1234.56);
  });

  it("should be able to parse a number string with parentheses for negative values, commas, and decimals", () => {
    expect(reverseFormatNumber("(R$-1.234,56)")).toBe(-1234.56);
  });

  it("should not be able to parse an invalid currency string", () => {
    expect(reverseFormatNumber("invalid")).toBe(NaN);
  });

  it("should not be able to parse an empty string", () => {
    expect(reverseFormatNumber("")).toBe(NaN);
  });

  it("should be able to parse a number string with currency symbol and negative sign", () => {
    expect(reverseFormatNumber("R$-123")).toBe(-123);
  });
});
