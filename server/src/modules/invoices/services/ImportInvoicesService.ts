import { NotFoundError } from "@/shared/errors/NotFoundError";

import { INVOICE_ITEMS_TO_FIND } from "@/config/constants";

import { IInvoicesRepository } from "../repositories/IInvoicesRepository";
import { IFilesRepository } from "@/modules/files/repositories/IFilesRepository";
import { ICustomersRepository } from "@/modules/customers/repositories/ICustomersRepository";

import { IFileToBeUploaded } from "@/modules/files/providers/FileManagerProvider/models/IFileToBeUploaded";
import { IFileManagerProvider } from "@/modules/files/providers/FileManagerProvider/models/IFileManagerProvider";
import { IPdfReaderProvider } from "../providers/PdfReaderProvider/models/IPdfReaderProvider";

import { IInvoice } from "../entities/IInvoice";

import { getDueDate } from "../helpers/getDueDate";
import { getTotalValue } from "../helpers/getTotalValue";
import { getCustomerName } from "../helpers/getCustomerName";
import { getCustomerNumber } from "../helpers/getCustomerNumber";
import { getReferenceMonth } from "../helpers/getReferenceMonth";
import {
  getInvoiceItemData,
  type InvoiceItemData,
} from "../helpers/getInvoiceItemData";

type ImportInvoicesServiceRequest = {
  files: IFileToBeUploaded[];
};

type ImportInvoicesServiceResponse = IInvoice[];

export class ImportInvoicesService {
  constructor(
    private readonly filesRepository: IFilesRepository,
    private readonly invoicesRepository: IInvoicesRepository,
    private readonly customersRepository: ICustomersRepository,
    private readonly pdfReaderProvider: IPdfReaderProvider,
    private readonly fileManagerProvider: IFileManagerProvider
  ) {}

  public async perform({
    files,
  }: ImportInvoicesServiceRequest): Promise<ImportInvoicesServiceResponse> {
    const invoices: IInvoice[] = [];

    for (const file of files) {
      const pdfFile = this.fileManagerProvider.prepareUpload(file);

      const pdfContent = await this.pdfReaderProvider.getContent(file.content);

      const pdfContentInLines = pdfContent
        .replace(/ {1,}/g, " ")
        .split("\n")
        .map((line) => line.trim());

      const customerName = this.getCustomerName(pdfContentInLines);

      if (!customerName) {
        throw new NotFoundError("Nome do cliente não foi encontrado");
      }

      const customerNumber = this.getCustomerNumber(pdfContentInLines);

      if (!customerNumber) {
        throw new NotFoundError("Número do cliente não foi encontrado");
      }

      let customer = await this.customersRepository.findByNumber({
        number: customerNumber,
      });

      const dueDate = this.getDueDate(pdfContentInLines);

      if (!dueDate) {
        throw new NotFoundError("Data de vencimento não foi encontrada");
      }

      const referenceMonth = this.getReferenceMonth(pdfContentInLines);

      if (!referenceMonth) {
        throw new NotFoundError("Mês de referência não foi encontrado");
      }

      const totalValue = this.getTotalValue(pdfContentInLines);

      if (!totalValue) {
        throw new NotFoundError("Valor total não foi encontrado");
      }

      const invoiceItems: InvoiceItemData[] = [];

      Object.keys(INVOICE_ITEMS_TO_FIND).forEach((INVOICE_ITEM) => {
        const invoiceItem = this.getInvoiceItemData(
          pdfContentInLines,
          INVOICE_ITEM as keyof typeof INVOICE_ITEMS_TO_FIND
        );

        if (invoiceItem) {
          invoiceItems.push(invoiceItem);
        }
      });

      if (!customer) {
        customer = await this.customersRepository.create({
          name: customerName,
          number: customerNumber,
        });
      }

      const { upload: uploadPdf, ...pdfData } = pdfFile;

      const pdf = await this.filesRepository.create(pdfData);

      const [day, month, year] = dueDate.split("/");

      const invoice = await this.invoicesRepository.create({
        pdfId: pdf.id,
        items: invoiceItems,
        dueDate: new Date(`${year}-${month}-${day}`),
        totalValue,
        referenceMonth,
        customerId: customer.id,
      });

      await uploadPdf();

      invoices.push(invoice);
    }

    return invoices;
  }

  public getCustomerName(contentInLines: string[]) {
    return getCustomerName(contentInLines);
  }

  public getDueDate(contentInLines: string[]) {
    return getDueDate(contentInLines);
  }

  public getTotalValue(contentInLines: string[]) {
    return getTotalValue(contentInLines);
  }

  public getCustomerNumber(contentInLines: string[]) {
    return getCustomerNumber(contentInLines);
  }

  public getReferenceMonth(contentInLines: string[]) {
    return getReferenceMonth(contentInLines);
  }

  public getInvoiceItemData(
    contentInLines: string[],
    itemName: keyof typeof INVOICE_ITEMS_TO_FIND
  ) {
    return getInvoiceItemData(contentInLines, itemName);
  }
}
