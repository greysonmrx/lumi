import { IFile } from "@/models/IFile";
import { IInvoice } from "@/models/IInvoice";
import { ICustomer } from "@/models/ICustomer";

import { APIError } from "@/errors/APIError";

import { HttpClient } from "./utils/HttpClient";

type ListCustomersWithInvoicesRequest = {
  year: string;
  customer?: string;
};

export type ListCustomersWithInvoicesResponse = Array<
  Omit<ICustomer, "createdAt"> & {
    invoices: Pick<IInvoice, "id" | "referenceMonth"> & {
      pdf: Pick<IFile, "url">;
    };
  }
>;

class CustomersService {
  private httpClient = HttpClient;

  public async listCustomersWithInvoices(
    params: ListCustomersWithInvoicesRequest
  ): Promise<ListCustomersWithInvoicesResponse> {
    try {
      const customersWithInvoices =
        await this.httpClient.get<ListCustomersWithInvoicesResponse>(
          "/customers",
          params
        );

      return customersWithInvoices.data;
    } catch (error) {
      const parsedError = error as any;

      let errorMessage = parsedError?.response?.data?.message;

      if (!errorMessage) {
        errorMessage = "Estamos tendo problemas ao tentar listar os clientes";
      }

      throw new APIError(errorMessage);
    }
  }
}

const CustomersServiceInstance = new CustomersService();

export { CustomersServiceInstance as CustomersService };
