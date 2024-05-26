import { randomUUID } from "node:crypto";

import { IInvoice } from "@/modules/invoices/entities/IInvoice";

import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";
import { IFindCustomerByNumberDTO } from "../../dtos/IFindCustomerByNumberDTO";

import { Customer } from "../../entities/fakes/Customer";

import { IFindAllWithInvoicesDTO } from "../../dtos/IFindAllWithInvoicesDTO";
import { IFindAllWithInvoicesResultDTO } from "../../dtos/IFindAllWithInvoicesResultDTO";

import { ICustomersRepository } from "../ICustomersRepository";
import { IFile } from "@/modules/files/entities/IFile";

export class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async findByNumber(
    data: IFindCustomerByNumberDTO
  ): Promise<Customer | null> {
    const findCustomer = this.customers.find(
      (customer) => customer.number === data.number
    );

    return findCustomer ?? null;
  }

  public async findAllWithInvoices(
    data: IFindAllWithInvoicesDTO
  ): Promise<IFindAllWithInvoicesResultDTO> {
    return this.customers
      .filter((customer) => {
        const invoiceExistsForTheGivenYear = customer.invoices?.some(
          (invoice) => invoice.referenceMonth.split("/")[1] === data.year
        );

        if (data.customer) {
          return (
            (customer.name.match(data.customer) ||
              customer.number.match(data.customer)) &&
            !!invoiceExistsForTheGivenYear
          );
        }

        return !!invoiceExistsForTheGivenYear;
      })
      .map((customer) => ({
        id: customer.id,
        name: customer.name,
        number: customer.number,
        invoices: (customer.invoices || []).map((invoice) => ({
          id: invoice.id,
          referenceMonth: invoice.referenceMonth,
          pdf: {
            name: invoice.pdf?.name || "",
            path: invoice.pdf?.path || "",
          },
        })),
      }));
  }

  public async create(
    data: ICreateCustomerDTO & {
      invoices?: (Pick<
        IInvoice,
        "referenceMonth" | "dueDate" | "totalValue"
      > & {
        pdf: Pick<IFile, "name" | "path">;
      })[];
    }
  ): Promise<Customer> {
    const customer = new Customer();

    const customerId = randomUUID();

    Object.assign(customer, {
      id: customerId,
      name: data.name,
      number: data.number,
      invoices: (data.invoices || []).map((invoice) => ({
        id: randomUUID(),
        pdfId: randomUUID(),
        pdf: {
          name: invoice.pdf?.name,
          path: invoice.pdf?.path,
        },
        customerId: customerId,
        referenceMonth: invoice.referenceMonth,
        dueDate: invoice.dueDate,
        totalValue: invoice.totalValue,
        createdAt: new Date(),
        items: [],
      })),
      createdAt: new Date(),
    });

    this.customers.push(customer);

    return customer;
  }
}
