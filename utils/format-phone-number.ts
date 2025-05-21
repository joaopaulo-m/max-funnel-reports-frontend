export function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 13) return value;

  const areaCode = digits.slice(2, 4);
  const firstDigit = digits.slice(4, 5);
  const firstPart = digits.slice(5, 9);
  const secondPart = digits.slice(9, 13);

  return `(${areaCode}) ${firstDigit} ${firstPart}-${secondPart}`;
}