export function convertMonetary(money) {
  if (!isNaN(money)) {
    const brl = money.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    return brl;
  }
}

export const convertMonetaryToDecimal = (value) => {
  if (typeof value === 'number') {
    return value;
  }

  const field = value.replace(/([^0-9,])+/g, '');
  const decimal = field.replace(',', '.');

  return parseFloat(decimal);
};
