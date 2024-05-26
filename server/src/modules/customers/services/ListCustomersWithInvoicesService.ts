import { ICustomersRepository } from "../repositories/ICustomersRepository";

import { IFindAllWithInvoicesDTO } from "../dtos/IFindAllWithInvoicesDTO";
import { IFindAllWithInvoicesResultDTO } from "../dtos/IFindAllWithInvoicesResultDTO";

type ListCustomersWithInvoicesServiceRequest = IFindAllWithInvoicesDTO;
type ListCustomersWithInvoicesServiceResponse = IFindAllWithInvoicesResultDTO;

export class ListCustomersWithInvoicesService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async perform({
    year,
    customer,
  }: ListCustomersWithInvoicesServiceRequest): Promise<ListCustomersWithInvoicesServiceResponse> {
    const customersWithInvoices =
      await this.customersRepository.findAllWithInvoices({ year, customer });

    return customersWithInvoices;
  }
}
