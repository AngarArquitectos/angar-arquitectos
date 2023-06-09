export function formatNumber(number) {
  if (Number.isInteger(number)) {
    number = number.toFixed(2);
  }
  return number.toLocaleString();
}