import { reverseFormatNumber } from "@/shared/utils/reverseFormatNumber";

import { INVOICE_ITEMS_TO_FIND } from "@/config/constants";

import { IInvoiceItem } from "../entities/IInvoiceItem";

export type InvoiceItemData = Omit<IInvoiceItem, "id" | "invoiceId">;

export function getInvoiceItemData(
  contentInLines: string[],
  itemName: keyof typeof INVOICE_ITEMS_TO_FIND
): InvoiceItemData | undefined {
  const lineWithItemData = contentInLines.find(
    (line, lineIndex) => line.match(itemName) && contentInLines[lineIndex + 1]
  );

  if (lineWithItemData) {
    const [amountOrTotalValue, unitPrice, totalValue] = lineWithItemData
      .split(itemName)[1]
      .trim()
      .split(" ");

    if (amountOrTotalValue && unitPrice && totalValue) {
      return {
        name: INVOICE_ITEMS_TO_FIND[itemName],
        amount: reverseFormatNumber(amountOrTotalValue),
        unitPrice: reverseFormatNumber(unitPrice),
        totalValue: reverseFormatNumber(totalValue),
      };
    }

    return {
      name: INVOICE_ITEMS_TO_FIND[itemName],
      totalValue: reverseFormatNumber(amountOrTotalValue),
    };
  }

  return undefined;
}
