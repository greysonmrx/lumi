import { Router } from "express";

import { invoicesRouter } from "@/modules/invoices/infra/http/routes/invoices.routes";

import { healthCheckRouter } from "./healthCheck.routes";

export const routes = Router();

routes.use(healthCheckRouter);

routes.use("/invoices", invoicesRouter);
