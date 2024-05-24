import { TEXT_TO_FIND_CUSTOMER_NUMBER_IN_PDF } from "@/config/constants";

export function getCustomerNumber(
  contentInLines: string[]
): string | undefined {
  const lineWithCustomerNumber = contentInLines.find(
    (_line, lineIndex) =>
      contentInLines[lineIndex - 1] &&
      contentInLines[lineIndex - 1].match(TEXT_TO_FIND_CUSTOMER_NUMBER_IN_PDF)
  );

  if (lineWithCustomerNumber) {
    return lineWithCustomerNumber.split(" ")[0];
  }

  return undefined;
}
