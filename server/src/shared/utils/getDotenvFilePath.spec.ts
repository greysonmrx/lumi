import { expect, it, describe } from "vitest";

import { getDotenvFilePath } from "./getDotenvFilePath";

describe("[UTILS] - Get Dotenv File Path", () => {
  it("should be able to return '.env.test' when 'TEST' is passed as the parameter", () => {
    const dotenvFilePath = getDotenvFilePath("TEST");

    expect(dotenvFilePath).toBe(".env.test");
  });

  it("should be able to return '.env' when no parameter is passed", () => {
    const dotenvFilePath = getDotenvFilePath();

    expect(dotenvFilePath).toBe(".env");
  });

  it("should be able to return '.env' when a different parameter is passed", () => {
    const dotenvFilePath = getDotenvFilePath("PRODUCTION");

    expect(dotenvFilePath).toBe(".env");
  });

  it("should be able to return '.env' when an empty string is passed", () => {
    const dotenvFilePath = getDotenvFilePath("");

    expect(dotenvFilePath).toBe(".env");
  });

  it("should be able to return '.env' when null is passed", () => {
    const dotenvFilePath = getDotenvFilePath(null as any);

    expect(dotenvFilePath).toBe(".env");
  });

  it("should be able to return '.env' when undefined is passed", () => {
    const dotenvFilePath = getDotenvFilePath(undefined);

    expect(dotenvFilePath).toBe(".env");
  });
});
