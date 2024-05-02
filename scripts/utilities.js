export function formatDate(date) {
  return date.format('DD MMMM');
}

export function formatDateInYY(date) {
  return date.format('YY');
}

export function formatDateInYYYY(date) {
  return date.format('YY');
}
export function formatCurrency(price) {
  return (price / 100).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

export function shakeAnimation(element) {
  element.style.animation = 'shake 300ms'; 
}
