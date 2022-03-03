export function getNextThursday() {
  var today = new Date();
  today.setDate(today.getDate() + (3 - today.getDay() + 7) % 7 + 1);
  return today.toISOString().split('T')[0];
}

export function getDateAndMonth(dateStr: string): string {
  const date = new Date(dateStr);
  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = monthList[date.getMonth()];
  return `${date.getDate()} ${month}`;
}
