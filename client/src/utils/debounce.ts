import lodashDebounce from "lodash.debounce";

export function debounce(callback: any, wait: number = 500) {
  return lodashDebounce(callback, wait);
}
