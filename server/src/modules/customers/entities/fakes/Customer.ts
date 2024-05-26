import { IInvoice } from "@/modules/invoices/entities/IInvoice";

import { ICustomer } from "../ICustomer";

export class Customer implements ICustomer {
  public id: string;
  public name: string;
  public number: string;
  public invoices?: IInvoice[];
  public createdAt: Date;
}
