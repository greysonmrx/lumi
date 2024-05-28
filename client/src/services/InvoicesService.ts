import { APIError } from "@/errors/APIError";

import { HttpClient } from "./utils/HttpClient";

type ShowInvoicesOverviewRequest = {
  customerNumber: string;
};

export type ShowInvoicesOverviewResponse = {
  [month: string]: {
    generatedEnergyAmount: number;
    consumedEnergyAmount: number;
    compensatedEnergyAmount: number;
    distributedEnergyGenerationValue: number;
    totalWithoutDistributedEnergyGeneration: number;
    invoicesTotalValue: number;
    amountOfInvoices: number;
  };
};

type ImportInvoicesRequest = {
  files: FileList;
};

class InvoicesService {
  private httpClient = HttpClient;

  public async showInvoicesOverview(
    params: ShowInvoicesOverviewRequest
  ): Promise<ShowInvoicesOverviewResponse> {
    try {
      const invoicesOverview =
        await this.httpClient.get<ShowInvoicesOverviewResponse>(
          "/invoices/overview",
          params
        );

      return invoicesOverview.data;
    } catch (error) {
      const parsedError = error as any;

      let errorMessage = parsedError?.response?.data?.message;

      if (!errorMessage) {
        errorMessage =
          "Estamos tendo problemas ao tentar mostrar os dados do painel de controle";
      }

      throw new APIError(errorMessage);
    }
  }

  public async importInvoices({ files }: ImportInvoicesRequest): Promise<void> {
    try {
      const payload = new FormData();

      Object.keys(files).forEach((_, fileIndex) => {
        const file = files.item(fileIndex);

        if (file) {
          payload.append("invoices", file);
        }
      });

      await this.httpClient.post("/invoices/upload", payload);
    } catch (error) {
      const parsedError = error as any;

      let errorMessage = parsedError?.response?.data?.message;

      if (!errorMessage) {
        errorMessage = "Estamos tendo problemas ao tentar importar as faturas";
      }

      throw new APIError(errorMessage);
    }
  }
}

const InvoicesServiceInstance = new InvoicesService();

export { InvoicesServiceInstance as InvoicesService };
