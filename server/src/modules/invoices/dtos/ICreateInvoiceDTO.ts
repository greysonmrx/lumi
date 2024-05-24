export interface ICreateInvoiceDTO {
  pdfId: string;
  customerId: string;
  dueDate: Date;
  totalValue: number;
  referenceMonth: string;
  pdf?: {
    name: string;
    path: string;
  };
  items: {
    name: string;
    amount?: number;
    unitPrice?: number;
    totalValue: number;
  }[];
}
