import "dotenv/config";

export const PORT = process.env.PORT ?? 5005;
export const ENV = process.env.NODE_ENV ?? "development";
