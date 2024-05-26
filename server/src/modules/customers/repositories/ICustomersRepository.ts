import { ICustomer } from "../entities/ICustomer";

import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { IFindCustomerByNumberDTO } from "../dtos/IFindCustomerByNumberDTO";
import { IFindAllWithInvoicesDTO } from "../dtos/IFindAllWithInvoicesDTO";
import { IFindAllWithInvoicesResultDTO } from "../dtos/IFindAllWithInvoicesResultDTO";

export interface ICustomersRepository {
  findByNumber(data: IFindCustomerByNumberDTO): Promise<ICustomer | null>;
  findAllWithInvoices(
    data: IFindAllWithInvoicesDTO
  ): Promise<IFindAllWithInvoicesResultDTO>;
  create(data: ICreateCustomerDTO): Promise<ICustomer>;
}
