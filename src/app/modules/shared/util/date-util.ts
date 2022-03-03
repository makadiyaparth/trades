export function getNextThursday() {
  var today = new Date();
  today.setDate(today.getDate() + (3 - today.getDay() + 7) % 7 + 1);
  return today.toISOString().split('T')[0];
}
