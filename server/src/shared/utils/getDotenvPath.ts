export function getDotenvPath(env: string): string {
  if (env === "TEST") {
    return ".env.test";
  }

  return ".env";
}
