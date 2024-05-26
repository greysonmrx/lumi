import { ImportInvoicesService } from "@/modules/invoices/services/ImportInvoicesService";

import { PdfParseProvider } from "@/modules/invoices/providers/PdfReaderProvider/implementations/PdfParseProvider";
import { LocalStorageProvider } from "@/modules/files/providers/FileManagerProvider/implementations/LocalStorageProvider";

import { FilesRepository } from "@/modules/files/infra/database/repositories/FilesRepository";

import { CustomersRepository } from "@/modules/customers/infra/database/repositories/CustomersRepository";
import { InvoicesRepository } from "../../database/repositories/InvoicesRepository";

export function makeImportInvoicesService(): ImportInvoicesService {
  const pdfParseProvider = new PdfParseProvider();
  const localStorageProvider = new LocalStorageProvider();
  const filesRepository = new FilesRepository();
  const invoicesRepository = new InvoicesRepository();
  const customersRepository = new CustomersRepository();

  const importInvoicesService = new ImportInvoicesService(
    filesRepository,
    invoicesRepository,
    customersRepository,
    pdfParseProvider,
    localStorageProvider
  );

  return importInvoicesService;
}
