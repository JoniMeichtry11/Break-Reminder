import type { Reminder } from '../types/reminder';
import { reminders } from '../config/reminder';

function isWorkTime() {
  const now = new Date();

  const day = now.getDay();

  const hour = now.getHours();

  const weekday = day >= 1 && day <= 5;

  const workHour = hour >= 8 && hour < 19;

  return weekday && workHour;
}

export function startScheduler(
  callback: (reminder: Reminder) => void,
) {
  reminders.forEach(({ interval, reminder }) => {
    setInterval(() => {
      if (isWorkTime()) {
        callback(reminder);
      }
    }, interval);
  });
}