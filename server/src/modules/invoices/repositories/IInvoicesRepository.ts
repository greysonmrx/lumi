import { ICreateInvoiceDTO } from "../dtos/ICreateInvoiceDTO";
import { IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO } from "../dtos/IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO";
import { IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO } from "../dtos/IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO";

import { IInvoice } from "../entities/IInvoice";

export interface IInvoicesRepository {
  getAmountOfInvoicesByCustomerNumberGroupedByReferenceMonth(
    data: Pick<
      IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO,
      "customerNumber"
    >
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO>;
  getInvoiceTotalValueByCustomerNumberGroupedByReferenceMonth(
    data: Pick<
      IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO,
      "customerNumber"
    >
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO>;
  getInvoiceItemAmountByCustomerNumberGroupedByReferenceMonth(
    data: IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO>;
  getInvoiceItemValueByCustomerNumberGroupedByReferenceMonth(
    data: IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthDTO
  ): Promise<IGetInvoiceItemAmountOrValueByCustomerNumberGroupedByReferenceMonthResultDTO>;
  create(data: ICreateInvoiceDTO): Promise<IInvoice>;
}
