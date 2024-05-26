import { Request, Response } from "express";

import { makeListCustomersWithInvoicesService } from "../factories/ListCustomersWithInvoicesServiceFactory";

export class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { customer, year } = request.query;

    const listCustomersWithInvoices = makeListCustomersWithInvoicesService();

    const customersWithInvoices = await listCustomersWithInvoices.perform({
      year: String(year),
      customer: customer ? String(customer) : undefined,
    });

    return response.json(customersWithInvoices);
  }
}
