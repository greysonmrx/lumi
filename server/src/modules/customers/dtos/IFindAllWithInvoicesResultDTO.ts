import { IFile } from "@/modules/files/entities/IFile";
import { IInvoice } from "@/modules/invoices/entities/IInvoice";

import { ICustomer } from "../entities/ICustomer";

export type IFindAllWithInvoicesResultDTO = (Pick<
  ICustomer,
  "id" | "name" | "number"
> & {
  invoices: (Pick<IInvoice, "id" | "referenceMonth"> & {
    pdf: Pick<IFile, "name">;
  })[];
})[];
