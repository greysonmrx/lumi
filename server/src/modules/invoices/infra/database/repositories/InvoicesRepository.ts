import { ICreateInvoiceDTO } from "@/modules/invoices/dtos/ICreateInvoiceDTO";
import { IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO } from "@/modules/invoices/dtos/IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO";
import { IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO } from "@/modules/invoices/dtos/IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO";

import { IInvoicesRepository } from "@/modules/invoices/repositories/IInvoicesRepository";

import { prisma } from "@/shared/infra/database";

export class InvoicesRepository implements IInvoicesRepository {
  public async getInvoiceItemValueByCustomerNumberGroupedByReferenceMonth(
    data: IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO> {
    const invoices = await prisma.invoice.findMany({
      where: {
        ...(data.customerNumber
          ? {
              customer: {
                number: {
                  equals: data.customerNumber,
                },
              },
            }
          : {}),
        items: {
          some: {
            name: data.invoiceItemName,
          },
        },
      },
      select: {
        referenceMonth: true,
        items: {
          where: {
            name: data.invoiceItemName,
          },
          select: {
            totalValue: true,
          },
        },
      },
    });

    const invoiceItemStats = invoices.reduce(
      (
        acc: {
          [referenceMonth: string]: {
            referenceMonth: string;
            amountOrValue: number;
          };
        },
        invoice
      ) => {
        const { referenceMonth, items } = invoice;
        const referenceMonthWithoutYear = referenceMonth.split("/")[0];
        const totalAmount = items.reduce(
          (sum, item) => sum + Math.abs(Number(item.totalValue)),
          0
        );

        if (!acc[referenceMonthWithoutYear]) {
          acc[referenceMonthWithoutYear] = {
            amountOrValue: 0,
            referenceMonth: referenceMonthWithoutYear,
          };
        }

        acc[referenceMonthWithoutYear].amountOrValue += totalAmount;

        return acc;
      },
      {}
    );

    return Object.values(invoiceItemStats);
  }

  public async getAmountOfInvoicesByCustomerNumberGroupedByReferenceMonth(
    data: Pick<
      IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO,
      "customerNumber"
    >
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO> {
    const invoicesAmountByReferenceMonth = await prisma.invoice.groupBy({
      by: ["referenceMonth"],
      _count: {
        referenceMonth: true,
      },
      where: {
        ...(data.customerNumber
          ? {
              customer: {
                number: {
                  equals: data.customerNumber,
                },
              },
            }
          : {}),
      },
    });

    const invoiceItemStats = invoicesAmountByReferenceMonth
      .map((invoiceAmountByReferenceMonth) => ({
        amountOrValue: invoiceAmountByReferenceMonth._count.referenceMonth,
        referenceMonth:
          invoiceAmountByReferenceMonth.referenceMonth.split("/")[0],
      }))
      .reduce(
        (
          acc: {
            [referenceMonth: string]: {
              referenceMonth: string;
              amountOrValue: number;
            };
          },
          invoice
        ) => {
          const { referenceMonth, amountOrValue } = invoice;

          if (!acc[referenceMonth]) {
            acc[referenceMonth] = { amountOrValue: 0, referenceMonth };
          }
          acc[referenceMonth].amountOrValue += amountOrValue;

          return acc;
        },
        {}
      );

    return Object.values(invoiceItemStats);
  }

  public async getInvoiceTotalValueByCustomerNumberGroupedByReferenceMonth(
    data: Pick<
      IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO,
      "customerNumber"
    >
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO> {
    const allInvoices = await prisma.invoice.findMany({
      where: {
        ...(data.customerNumber
          ? {
              customer: {
                number: {
                  equals: data.customerNumber,
                },
              },
            }
          : {}),
      },
      select: {
        referenceMonth: true,
        totalValue: true,
      },
    });

    const invoiceItemStats = allInvoices.reduce(
      (
        acc: {
          [referenceMonth: string]: {
            referenceMonth: string;
            amountOrValue: number;
          };
        },
        invoice
      ) => {
        const { referenceMonth, totalValue } = invoice;

        const referenceMonthWithoutYear = referenceMonth.split("/")[0];

        if (!acc[referenceMonthWithoutYear]) {
          acc[referenceMonthWithoutYear] = {
            amountOrValue: 0,
            referenceMonth: referenceMonthWithoutYear,
          };
        }

        acc[referenceMonthWithoutYear].amountOrValue += Number(totalValue) || 0;

        return acc;
      },
      {}
    );

    return Object.values(invoiceItemStats);
  }

  public async getInvoiceItemAmountByCustomerNumberGroupedByReferenceMonth(
    data: IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO> {
    const invoices = await prisma.invoice.findMany({
      where: {
        ...(data.customerNumber
          ? {
              customer: {
                number: {
                  equals: data.customerNumber,
                },
              },
            }
          : {}),
        items: {
          some: {
            name: data.invoiceItemName,
          },
        },
      },
      select: {
        referenceMonth: true,
        items: {
          where: {
            name: data.invoiceItemName,
          },
          select: {
            amount: true,
          },
        },
      },
    });

    const invoiceItemStats = invoices.reduce(
      (
        acc: {
          [referenceMonth: string]: {
            referenceMonth: string;
            amountOrValue: number;
          };
        },
        invoice
      ) => {
        const { referenceMonth, items } = invoice;
        const referenceMonthWithoutYear = referenceMonth.split("/")[0];
        const totalAmount = items.reduce(
          (sum, item) => sum + Number(item.amount),
          0
        );

        if (!acc[referenceMonthWithoutYear]) {
          acc[referenceMonthWithoutYear] = {
            amountOrValue: 0,
            referenceMonth: referenceMonthWithoutYear,
          };
        }

        acc[referenceMonthWithoutYear].amountOrValue += totalAmount;

        return acc;
      },
      {}
    );

    return Object.values(invoiceItemStats);
  }

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
