import { IInvoice } from "@/modules/invoices/entities/IInvoice";

export interface IFile {
  id: string;
  name: string;
  path: string;
  url?: string;
  invoice?: IInvoice;
  createdAt: Date;
}
