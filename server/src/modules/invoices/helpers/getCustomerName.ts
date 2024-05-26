import {
  BARCODE_REGEX,
  TEXT_TO_FIND_BARCODE_IN_PDF,
  TEXT_TO_FIND_PAYMENT_VOUCHER_IN_PDF,
} from "@/config/constants";

export function getCustomerName(contentInLines: string[]): string | undefined {
  const filteredContentInLines = contentInLines.filter(
    (content) =>
      !content.match("ATENÇÃO:") && !content.match("DÉBITO AUTOMÁTICO")
  );

  const lineWithCustomerName = filteredContentInLines.find(
    (line, lineIndex) => {
      if (
        filteredContentInLines[lineIndex - 1] &&
        (filteredContentInLines[lineIndex - 1].match(BARCODE_REGEX) ||
          filteredContentInLines[lineIndex - 1].match(
            TEXT_TO_FIND_BARCODE_IN_PDF
          ) ||
          filteredContentInLines[lineIndex - 1].match(
            TEXT_TO_FIND_PAYMENT_VOUCHER_IN_PDF
          ))
      ) {
        if (line.match(TEXT_TO_FIND_BARCODE_IN_PDF)) {
          return undefined;
        }

        return line;
      }

      return undefined;
    }
  );

  if (lineWithCustomerName) {
    return lineWithCustomerName;
  }

  return undefined;
}
