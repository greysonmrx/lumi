import { IFile } from "@/modules/files/entities/IFile";
import { ICustomer } from "@/modules/customers/entities/ICustomer";

import { IInvoice } from "../IInvoice";
import { IInvoiceItem } from "../IInvoiceItem";

export class Invoice implements IInvoice {
  public id: string;
  public dueDate: Date;
  public items?: IInvoiceItem[];
  public customer?: ICustomer;
  public customerId: string;
  public pdf?: IFile;
  public pdfId?: string;
  public referenceMonth: string;
  public totalValue: number;
  public createdAt: Date;
}
