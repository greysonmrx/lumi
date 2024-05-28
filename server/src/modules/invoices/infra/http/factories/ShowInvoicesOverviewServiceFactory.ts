import { ShowInvoicesOverviewService } from "@/modules/invoices/services/ShowInvoicesOverviewService";

import { InvoicesRepository } from "../../database/repositories/InvoicesRepository";

export function makeShowInvoicesOverviewService(): ShowInvoicesOverviewService {
  const invoicesRepository = new InvoicesRepository();

  const showInvoicesOverviewService = new ShowInvoicesOverviewService(
    invoicesRepository
  );

  return showInvoicesOverviewService;
}
