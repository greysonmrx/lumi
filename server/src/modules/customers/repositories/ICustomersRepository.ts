import { ICustomer } from "../entities/ICustomer";

import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { IFindCustomerByNumberDTO } from "../dtos/IFindCustomerByNumberDTO";

export interface ICustomersRepository {
  findByNumber(data: IFindCustomerByNumberDTO): Promise<ICustomer | null>;
  create(data: ICreateCustomerDTO): Promise<ICustomer>;
}
