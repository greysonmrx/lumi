import { DATE_REGEX, TEXT_TO_FIND_DUE_DATE_IN_PDF } from "@/config/constants";

export function getDueDate(contentInLines: string[]): string | undefined {
  const lineWithDueDate = contentInLines.find(
    (line, lineIndex) =>
      contentInLines[lineIndex - 1] &&
      contentInLines[lineIndex - 1].match(TEXT_TO_FIND_DUE_DATE_IN_PDF) &&
      line.match(DATE_REGEX)
  );

  if (lineWithDueDate) {
    const foundDueDate = lineWithDueDate.match(DATE_REGEX);

    if (foundDueDate) {
      return foundDueDate[0];
    }
  }

  return undefined;
}
