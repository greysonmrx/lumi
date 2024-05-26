import { Router } from "express";

import { invoicesRouter } from "@/modules/invoices/infra/http/routes/invoices.routes";
import { customersRouter } from "@/modules/customers/infra/http/routes/customers.routes";

import { healthCheckRouter } from "./healthCheck.routes";

export const routes = Router();

routes.use(healthCheckRouter);

routes.use("/invoices", invoicesRouter);
routes.use("/customers", customersRouter);
