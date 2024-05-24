import { TEXT_TO_FIND_REFERENCE_MONTH_IN_PDF } from "@/config/constants";

export function getReferenceMonth(
  contentInLines: string[]
): string | undefined {
  const lineWithReferenceMonth = contentInLines.find(
    (_line, lineIndex) =>
      contentInLines[lineIndex - 1] &&
      contentInLines[lineIndex - 1].match(TEXT_TO_FIND_REFERENCE_MONTH_IN_PDF)
  );

  if (lineWithReferenceMonth) {
    const [referenceMonth] = lineWithReferenceMonth.split(" ");

    return referenceMonth;
  }

  return undefined;
}
