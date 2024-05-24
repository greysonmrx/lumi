import "@/config/env";

import express, { Express, Request, Response, NextFunction } from "express";
import "express-async-errors";

import cors from "cors";

import { BadRequestError } from "@/shared/errors/BadRequestError";
import { ServiceUnavailableError } from "@/shared/errors/ServiceUnavailableError";

import { LOCAL_UPLOADS_FOLDER } from "@/config/upload";

import routes from "./routes";

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use("/files", express.static(LOCAL_UPLOADS_FOLDER));
  }

  private routes(): void {
    this.server.use(routes);
  }

  private exceptionHandler(): void {
    this.server.use(
      (
        error: Error,
        _request: Request,
        response: Response,
        _next: NextFunction
      ) => {
        if (error instanceof BadRequestError) {
          return response.status(400).json({
            status: "error",
            message: error.message,
          });
        }

        if (error instanceof ServiceUnavailableError) {
          return response.status(503).json({
            status: "error",
            message: error.message,
          });
        }

        // eslint-disable-next-line
        console.error(`\x1b[32m\n${error}\n`);

        return response.status(500).json({
          status: "error",
          message: "Erro interno do servidor",
        });
      }
    );
  }
}

const appServerIntance = new App().server;

export { appServerIntance };
