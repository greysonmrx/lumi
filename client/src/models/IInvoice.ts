import { IFile } from "./IFile";
import { IInvoiceItem } from "./IInvoiceItem";

export interface IInvoice {
  id: string;
  pdfId?: string;
  pdf?: IFile;
  customerId: string;
  referenceMonth: string;
  dueDate: string;
  totalValue: number;
  createdAt: string;
  items?: IInvoiceItem[];
}
