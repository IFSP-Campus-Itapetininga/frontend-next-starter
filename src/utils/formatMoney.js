export default function convertMonetary(money) {
  if (!isNaN(money)) {
    const brl = money.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    return brl;
  }
}
