import { TEXT_TO_FIND_TOTAL_VALUE_IN_PDF } from "@/config/constants";

import { isNumber } from "@/shared/utils/isNumber";
import { reverseFormatNumber } from "@/shared/utils/reverseFormatNumber";

export function getTotalValue(contentInLines: string[]): number | undefined {
  const lineWithTotalValue = contentInLines.find((line) =>
    line.match(TEXT_TO_FIND_TOTAL_VALUE_IN_PDF)
  );

  if (lineWithTotalValue) {
    const [, totalValueAsString] = lineWithTotalValue.split(" ");

    if (isNumber(reverseFormatNumber(totalValueAsString))) {
      return reverseFormatNumber(totalValueAsString);
    }
  }

  return undefined;
}
