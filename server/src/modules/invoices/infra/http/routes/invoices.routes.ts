import { Router } from "express";

import fileUpload from "express-fileupload";

import { InvoicesController } from "../controllers/InvoicesController";
import { InvoicesOverviewController } from "../controllers/InvoicesOverviewController";

import { importInvoicesValidator } from "../validators/importInvoicesValidator";

const invoicesRouter = Router();

const invoicesController = new InvoicesController();
const invoicesOverviewController = new InvoicesOverviewController();

invoicesRouter.get("/overview", invoicesOverviewController.index);
invoicesRouter.post(
  "/upload",
  fileUpload(),
  importInvoicesValidator,
  invoicesController.store
);

export { invoicesRouter };
