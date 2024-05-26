import { expect, it, describe } from "vitest";

import { generateFileKey } from "./generateFileKey";

describe("[UTILS] - Generate File Key", () => {
  const FILE_NAME = "invoice.pdf";

  it("should be able to generate a random file key with the same extension as the original file", () => {
    const randomFileKey = generateFileKey(FILE_NAME);

    expect(randomFileKey.endsWith(".pdf")).toBe(true);
  });

  it("should be able to generate a random file key with a different prefix each time", () => {
    const firstRandomFileKey = generateFileKey(FILE_NAME);
    const secondRandomFileKey = generateFileKey(FILE_NAME);

    expect(firstRandomFileKey).not.toBe(secondRandomFileKey);
  });

  it("should be able to generate a random file key with the same extension for various extensions", () => {
    const extensions = ["txt", "jpg", "png", "pdf", "docx"];

    extensions.forEach((extension) => {
      const originalFileName = `example.${extension}`;
      const randomFileKey = generateFileKey(originalFileName);

      expect(randomFileKey.endsWith(`.${extension}`)).toBe(true);
    });
  });
});
