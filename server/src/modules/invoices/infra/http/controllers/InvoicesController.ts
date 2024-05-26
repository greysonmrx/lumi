import { Request, Response } from "express";
import type { UploadedFile } from "express-fileupload";

import { makeImportInvoicesService } from "../factories/ImportInvoicesServiceFactory";

export class InvoicesController {
  public async store(request: Request, response: Response): Promise<Response> {
    const files = Object.values(request.invoices).map(
      (invoice: UploadedFile) => ({
        name: invoice.name,
        size: invoice.size,
        content: invoice.data,
      })
    );

    const importInvoices = makeImportInvoicesService();

    const invoices = await importInvoices.perform({ files });

    return response.status(201).json(invoices);
  }
}
