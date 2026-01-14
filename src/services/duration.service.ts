// 01:00, 10:59
export function getDurationInHours(duration: string): number {
  const [hoursStr, minutesStr] = duration.split(":");

  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (isNaN(hours) || isNaN(minutes)) {
    return 0;
  }

  const value = hours + minutes / 60;

  return Math.round(value * 100) / 100;
}
