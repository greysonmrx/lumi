import { Request, Response, NextFunction } from "express";

import { BadRequestError } from "@/shared/errors/BadRequestError";

export function importInvoicesValidator(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  if (request.files && request.files.invoices) {
    if (!Array.isArray(request.files.invoices)) {
      request.invoices = [request.files.invoices];
    } else {
      request.invoices = request.files.invoices;
    }

    return next();
  }

  throw new BadRequestError("Nenhuma fatura encontrada para a importação");
}
