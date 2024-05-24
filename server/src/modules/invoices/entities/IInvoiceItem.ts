export interface IInvoiceItem {
  id: string;
  name: string;
  amount?: number;
  invoiceId: string;
  unitPrice?: number;
  totalValue: number;
}
