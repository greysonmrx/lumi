import { IFile } from "@/modules/files/entities/IFile";
import { ICustomer } from "@/modules/customers/entities/ICustomer";

import { IInvoiceItem } from "./IInvoiceItem";

export interface IInvoice {
  id: string;
  pdfId?: string;
  pdf?: IFile;
  customerId: string;
  customer?: ICustomer;
  referenceMonth: string;
  dueDate: Date;
  totalValue: number;
  createdAt: Date;
  items?: IInvoiceItem[];
}
