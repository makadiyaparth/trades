export function getNextThursday(): string {
  var today = new Date();
  today.setDate(today.getDate() + (((4 - today.getDay() + 7) % 7) || 7));
  return today.toISOString().split('T')[0];
}

export function getDateAndMonth(dateStr: string): string {
  const date = new Date(dateStr);
  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = monthList[date.getMonth()];
  return `${date.getDate()} ${month}`;
}
