import { ICreateInvoiceDTO } from "@/modules/invoices/dtos/ICreateInvoiceDTO";

import { IInvoicesRepository } from "@/modules/invoices/repositories/IInvoicesRepository";

import { prisma } from "@/shared/infra/database";

export class InvoicesRepository implements IInvoicesRepository {
  public async create(data: ICreateInvoiceDTO): Promise<any> {
    const invoice = await prisma.invoice.create({
      data: {
        pdfId: data.pdfId,
        dueDate: data.dueDate,
        referenceMonth: data.referenceMonth,
        totalValue: data.totalValue,
        customerId: data.customerId,
        items: {
          createMany: {
            data: data.items.map((item) => ({
              name: item.name,
              amount: item.amount,
              totalValue: item.totalValue,
              unitPrice: item.unitPrice,
            })),
          },
        },
      },
    });

    return invoice;
  }
}
