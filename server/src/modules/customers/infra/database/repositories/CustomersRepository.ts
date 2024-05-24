import { ICreateCustomerDTO } from "@/modules/customers/dtos/ICreateCustomerDTO";
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
