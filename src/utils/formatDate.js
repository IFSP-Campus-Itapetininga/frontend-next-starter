export function formatDate(date) {
  const d = date.toLocaleDateString('pt-BR').split('/');
  const newDate = `${d[2]}-${d[1]}-${d[0]}`
  const time = date.toTimeString().split(' ')[0]
  return `${newDate} ${time}`
}