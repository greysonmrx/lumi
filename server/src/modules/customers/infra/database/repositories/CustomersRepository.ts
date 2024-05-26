import { ICreateCustomerDTO } from "@/modules/customers/dtos/ICreateCustomerDTO";
import { IFindAllWithInvoicesDTO } from "@/modules/customers/dtos/IFindAllWithInvoicesDTO";
import { IFindAllWithInvoicesResultDTO } from "@/modules/customers/dtos/IFindAllWithInvoicesResultDTO";
import { IFindCustomerByNumberDTO } from "@/modules/customers/dtos/IFindCustomerByNumberDTO";
import { ICustomer } from "@/modules/customers/entities/ICustomer";
import { ICustomersRepository } from "@/modules/customers/repositories/ICustomersRepository";

import { prisma } from "@/shared/infra/database";

export class CustomersRepository implements ICustomersRepository {
  public async findByNumber({
    number,
  }: IFindCustomerByNumberDTO): Promise<ICustomer | null> {
    const customer = await prisma.customer.findUnique({ where: { number } });

    return customer;
  }

  public async findAllWithInvoices(
    data: IFindAllWithInvoicesDTO
  ): Promise<IFindAllWithInvoicesResultDTO> {
    const customers = await prisma.customer.findMany({
      where: {
        ...(data.customer
          ? {
              OR: [
                {
                  name: {
                    contains: data.customer,
                    mode: "insensitive",
                  },
                },
                {
                  number: {
                    startsWith: data.customer,
                  },
                },
              ],
            }
          : {}),
        invoices: {
          some: {
            referenceMonth: {
              endsWith: data.year,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        number: true,
        invoices: {
          select: {
            id: true,
            referenceMonth: true,
            pdf: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    return customers;
  }

  public async create(data: ICreateCustomerDTO): Promise<ICustomer> {
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        number: data.number,
      },
    });

    return customer;
  }
}
