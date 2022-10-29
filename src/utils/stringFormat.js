export function formatCelphoneNumber(value) {
  if (!value) {
    return;
  }

  value = value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})/, '$1-$2');

  return value;
}
