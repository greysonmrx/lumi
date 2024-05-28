import { randomUUID } from "node:crypto";

import { ICreateInvoiceDTO } from "../../dtos/ICreateInvoiceDTO";
import { IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO } from "../../dtos/IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO";
import { IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO } from "../../dtos/IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO";

import { Invoice } from "../../entities/fakes/Invoice";

import { IInvoicesRepository } from "../IInvoicesRepository";
import { IInvoice } from "../../entities/IInvoice";

export class FakeInvoicesRepository implements IInvoicesRepository {
  private invoiceList: IInvoice[] = [];

  public async getInvoiceItemValueByCustomerNumberGroupedByReferenceMonth(
    data: IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO> {
    const invoiceItemStats = this.invoiceList
      .filter((invoice) => {
        if (data.customerNumber) {
          return invoice.customerId === data.customerNumber;
        }

        return true;
      })
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
          const { referenceMonth, items } = invoice;
          const referenceMonthWithoutYear = referenceMonth.split("/")[0];
          const totalAmount = (items || [])
            .filter((item) => item.name === data.invoiceItemName)
            .reduce((sum, item) => sum + Math.abs(Number(item.totalValue)), 0);

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
    const invoiceItemStats = this.invoiceList
      .filter((invoice) => {
        if (data.customerNumber) {
          return invoice.customerId === data.customerNumber;
        }

        return true;
      })
      .map((invoice) => ({
        amountOrValue: this.invoiceList.filter(
          (invoiceAmount) =>
            invoiceAmount.referenceMonth === invoice.referenceMonth
        ).length,
        referenceMonth: invoice.referenceMonth.split("/")[0],
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
    const invoiceItemStats = this.invoiceList
      .filter((invoice) => {
        if (data.customerNumber) {
          return invoice.customerId === data.customerNumber;
        }

        return true;
      })
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
          const { referenceMonth, totalValue } = invoice;

          const referenceMonthWithoutYear = referenceMonth.split("/")[0];

          if (!acc[referenceMonthWithoutYear]) {
            acc[referenceMonthWithoutYear] = {
              amountOrValue: 0,
              referenceMonth: referenceMonthWithoutYear,
            };
          }

          acc[referenceMonthWithoutYear].amountOrValue +=
            Number(totalValue) || 0;

          return acc;
        },
        {}
      );

    return Object.values(invoiceItemStats);
  }

  public async getInvoiceItemAmountByCustomerNumberGroupedByReferenceMonth(
    data: IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO> {
    const invoiceItemStats = this.invoiceList
      .filter((invoice) => {
        if (data.customerNumber) {
          return invoice.customerId === data.customerNumber;
        }

        return true;
      })
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
          const { referenceMonth, items } = invoice;
          const referenceMonthWithoutYear = referenceMonth.split("/")[0];
          const totalAmount = (items || [])
            .filter((item) => item.name === data.invoiceItemName)
            .reduce((sum, item) => sum + Number(item.amount), 0);

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
      customerId: data.customerId,
      pdfId: data.pdfId,
      referenceMonth: data.referenceMonth,
      totalValue: data.totalValue,
      createdAt: new Date(),
    });

    this.invoiceList.push(invoice);

    return invoice;
  }
}
