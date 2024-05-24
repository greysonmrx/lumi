import { Router } from "express";

import { healthCheckRouter } from "./healthCheck.routes";

const routes = Router();

routes.use(healthCheckRouter);

export default routes;
