import { config } from "dotenv";
import { cwd } from "node:process";
import { resolve } from "node:path";

import { getDotenvPath } from "@/shared/utils/getDotenvPath";

import { ENV } from "@/config/app";

config({ path: resolve(cwd(), getDotenvPath(ENV)) });
