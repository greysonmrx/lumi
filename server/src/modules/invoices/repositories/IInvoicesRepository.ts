import { ICreateInvoiceDTO } from "../dtos/ICreateInvoiceDTO";

import { IInvoice } from "../entities/IInvoice";

export interface IInvoicesRepository {
  create(data: ICreateInvoiceDTO): Promise<IInvoice>;
}
