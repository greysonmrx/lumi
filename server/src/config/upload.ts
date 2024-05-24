import { resolve } from "node:path";

export const FILES_URL = process.env.FILES_URL ?? "http://localhost:5005/files";
export const LOCAL_UPLOADS_FOLDER = resolve(__dirname, "..", "..", "tmp");
