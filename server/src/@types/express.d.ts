declare namespace Express {
  export interface Request {
    invoices: UploadedFile[];
  }
}
