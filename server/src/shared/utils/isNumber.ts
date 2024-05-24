export function isNumber(number: any): boolean {
  const acceptableTypes = ["number", "string"];

  return acceptableTypes.includes(typeof number) && !isNaN(number);
}
