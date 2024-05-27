export interface IInvoiceItem {
  id: string;
  invoiceId: string;
  name: string;
  amount?: number;
  unitPrice?: number;
  totalValue: number;
}
