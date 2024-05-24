export function reverseFormatNumber(value = "00,00"): number {
  return parseFloat(
    value
      .replaceAll("R$", "")
      .replaceAll(" ", "")
      .replaceAll(".", "")
      .replaceAll(",", ".")
  );
}
