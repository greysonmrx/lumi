import { randomUUID } from "node:crypto";

import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";
import { IFindCustomerByNumberDTO } from "../../dtos/IFindCustomerByNumberDTO";

import { Customer } from "../../entities/fakes/Customer";

import { ICustomersRepository } from "../ICustomersRepository";

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

  public async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {
      id: randomUUID(),
      name: data.name,
      number: data.number,
      createdAt: new Date(),
    });

    this.customers.push(customer);

    return customer;
  }
}
