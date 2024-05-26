import { IInvoice } from "@/modules/invoices/entities/IInvoice";

import { IFile } from "../IFile";

export class File implements IFile {
  public id: string;
  public name: string;
  public path: string;
  public url?: string;
  public invoice?: IInvoice;
  public createdAt: Date;
}
