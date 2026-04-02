export function getLocalDateInputValue(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA').format(date)
}
