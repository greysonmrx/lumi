import { Request, Response, Router } from "express";

import { ServiceUnavailableError } from "@/shared/errors/ServiceUnavailableError";

const healthCheckRouter = Router();

healthCheckRouter.get(
  "/health-check",
  (_request: Request, response: Response) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };

    try {
      return response.json(healthcheck);
    } catch (error) {
      throw new ServiceUnavailableError();
    }
  }
);

export { healthCheckRouter };
