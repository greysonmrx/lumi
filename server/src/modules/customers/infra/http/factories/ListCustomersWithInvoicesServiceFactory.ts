import { ListCustomersWithInvoicesService } from "@/modules/customers/services/ListCustomersWithInvoicesService";

import { CustomersRepository } from "../../database/repositories/CustomersRepository";

export function makeListCustomersWithInvoicesService(): ListCustomersWithInvoicesService {
  const customersRepository = new CustomersRepository();

  const listCustomersWithInvoicesService = new ListCustomersWithInvoicesService(
    customersRepository
  );

  return listCustomersWithInvoicesService;
}
