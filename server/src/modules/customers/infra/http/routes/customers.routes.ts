import { Router } from "express";

import { CustomersController } from "../controllers/CustomersController";

export const customersRouter = Router();

const customersController = new CustomersController();

customersRouter.get("/", customersController.index);
