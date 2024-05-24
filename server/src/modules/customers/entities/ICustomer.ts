import { IInvoice } from "@/modules/invoices/entities/IInvoice";

export interface ICustomer {
  id: string;
  name: string;
  number: string;
  invoices?: IInvoice[];
  createdAt: Date;
}
