import { Request, Response } from "express";

import { makeShowInvoicesOverviewService } from "../factories/ShowInvoicesOverviewServiceFactory";

export class InvoicesOverviewController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showInvoicesOverview = makeShowInvoicesOverviewService();

    const invoicesOverview = await showInvoicesOverview.perform({
      customerNumber: String(request.query.customerNumber),
    });

    return response.json(invoicesOverview);
  }
}
