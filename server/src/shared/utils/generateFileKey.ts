import { randomBytes } from "node:crypto";

export function generateFileKey(fileName: string): string {
  const hash = randomBytes(10).toString("hex");
  const timestamp = Date.now();

  return `${hash}-${timestamp}-${fileName}`;
}
