import { Router } from "express";

import fileUpload from "express-fileupload";

import { InvoicesController } from "../controllers/InvoicesController";

import { importInvoicesValidator } from "../validators/importInvoicesValidator";

const invoicesRouter = Router();

const invoicesController = new InvoicesController();

invoicesRouter.post(
  "/upload",
  fileUpload(),
  importInvoicesValidator,
  invoicesController.store
);

export { invoicesRouter };
