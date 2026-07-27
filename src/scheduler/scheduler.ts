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

// función para generar intervalos aleatorios
function randomInterval(minMinutes: number, maxMinutes: number): number {
  const min = minMinutes * 60 * 1000;
  const max = maxMinutes * 60 * 1000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// scheduler con setTimeout para variar los tiempos
function scheduleReminder(reminder: Reminder, minMinutes: number, maxMinutes: number, callback: (reminder: Reminder) => void) {
  const nextInterval = randomInterval(minMinutes, maxMinutes);

  setTimeout(() => {
    if (isWorkTime()) {
      callback(reminder);
    }
    // volver a programar el siguiente
    scheduleReminder(reminder, minMinutes, maxMinutes, callback);
  }, nextInterval);
}

export function startScheduler(callback: (reminder: Reminder) => void) {
  reminders.forEach(({ interval, reminder }) => {
    if (reminder.title.includes('pararte')) {
      scheduleReminder(reminder, 40, 50, callback); // entre 40 y 50 min
    } else if (reminder.title.includes('sentate')) {
      scheduleReminder(reminder, 15, 25, callback); // entre 15 y 25 min
    } else {
      // los demás se mantienen fijos
      const minutes = interval / 60000;
      scheduleReminder(reminder, minutes, minutes, callback);
    }
  });
}
