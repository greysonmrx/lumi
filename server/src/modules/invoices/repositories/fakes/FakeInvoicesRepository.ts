import { randomUUID } from "node:crypto";

import { ICreateInvoiceDTO } from "../../dtos/ICreateInvoiceDTO";

import { Invoice } from "../../entities/fakes/Invoice";

import { IInvoicesRepository } from "../IInvoicesRepository";

export class FakeInvoicesRepository implements IInvoicesRepository {
  public async create(data: ICreateInvoiceDTO): Promise<Invoice> {
    const invoice = new Invoice();

    const invoiceId = randomUUID();

    Object.assign(invoice, {
      id: invoiceId,
      dueDate: data.dueDate,
      items: data.items.map((item) => ({
        ...item,
        id: randomUUID(),
        invoiceId,
      })),
      customerId: randomUUID(),
      pdfId: randomUUID(),
      referenceMonth: data.referenceMonth,
      totalValue: data.totalValue,
      createdAt: new Date(),
    });

    return invoice;
  }
}
