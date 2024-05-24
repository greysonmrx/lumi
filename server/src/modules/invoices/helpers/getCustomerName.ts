import {
  BARCODE_REGEX,
  TEXT_TO_FIND_BARCODE_IN_PDF,
  TEXT_TO_FIND_PAYMENT_VOUCHER_IN_PDF,
} from "@/config/constants";

export function getCustomerName(contentInLines: string[]): string | undefined {
  const lineWithCustomerName = contentInLines.find((line, lineIndex) => {
    if (
      contentInLines[lineIndex - 1] &&
      (contentInLines[lineIndex - 1].match(BARCODE_REGEX) ||
        contentInLines[lineIndex - 1].match(TEXT_TO_FIND_BARCODE_IN_PDF) ||
        contentInLines[lineIndex - 1].match(
          TEXT_TO_FIND_PAYMENT_VOUCHER_IN_PDF
        ))
    ) {
      if (line.match(TEXT_TO_FIND_BARCODE_IN_PDF)) {
        return undefined;
      }

      return line;
    }

    return undefined;
  });

  if (lineWithCustomerName) {
    return lineWithCustomerName;
  }

  // const secondAttemptToGetTheLineWithCustomerName = contentInLines.find(
  //   (line, lineIndex) => {
  //     if (
  //       contentInLines[lineIndex - 1] &&
  //       contentInLines[lineIndex - 1].match("Comprovante de Pagamento")
  //     ) {
  //       return line;
  //     }

  //     return undefined;
  //   }
  // );

  // if (secondAttemptToGetTheLineWithCustomerName) {
  //   return secondAttemptToGetTheLineWithCustomerName;
  // }

  return undefined;
}
