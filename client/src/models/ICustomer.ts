import { IInvoice } from "./IInvoice";

export interface ICustomer {
  id: string;
  number: string;
  name: string;
  invoices?: IInvoice[];
  createdAt: string;
}
