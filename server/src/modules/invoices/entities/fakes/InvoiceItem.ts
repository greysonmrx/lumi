import { IInvoiceItem } from "../IInvoiceItem";

export class InvoiceItem implements IInvoiceItem {
  public id: string;
  public name: string;
  public amount?: number;
  public invoiceId: string;
  public totalValue: number;
  public unitPrice?: number;
}
