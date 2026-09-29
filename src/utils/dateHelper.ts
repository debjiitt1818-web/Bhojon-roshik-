/**
 * Date helper for Bhojon Roshik 2-day advance order policy
 */

export function getEarliestDeliveryDate(): Date {
  const date = new Date();
  // Add 2 full days
  date.setDate(date.getDate() + 2);
  return date;
}

export function formatDateToYYYYMMDD(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function formatFriendlyDate(dateStr: string): string {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-').map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function isDateAtLeastTwoDaysAhead(selectedDateStr: string): boolean {
  if (!selectedDateStr) return false;
  const [yyyy, mm, dd] = selectedDateStr.split('-').map(Number);
  const selectedDate = new Date(yyyy, mm - 1, dd);
  selectedDate.setHours(0, 0, 0, 0);

  const minDate = getEarliestDeliveryDate();
  minDate.setHours(0, 0, 0, 0);

  return selectedDate.getTime() >= minDate.getTime();
}
