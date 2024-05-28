import type { Options } from "tsup";

import { esbuildDecorators } from "@anatine/esbuild-decorators";

export const tsup: Options = {
  splitting: true,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [esbuildDecorators()],
  entryPoints: ["src/shared/infra/http/server.ts"],
};
