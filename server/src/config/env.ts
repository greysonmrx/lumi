import { config } from "dotenv";
import { cwd } from "node:process";
import { resolve } from "node:path";

import { getDotenvFilePath } from "@/shared/utils/getDotenvFilePath";

import { ENV } from "@/config/app";

config({ path: resolve(cwd(), getDotenvFilePath(ENV)) });
