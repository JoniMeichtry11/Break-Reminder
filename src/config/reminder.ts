import type { Reminder } from '../types/reminder';

export interface ReminderConfig {
  interval: number;
  reminder: Reminder;
}

export const reminders: ReminderConfig[] = [
  {
    interval: 45 * 60 * 1000,
    reminder: {
      emoji: '🧍',
      title: 'Hora de pararte',
      message: 'Levantate y cambiá de postura.',
    },
  },
  {
    interval: 90 * 60 * 1000,
    reminder: {
      emoji: '💧',
      title: 'Tomá agua',
      message: 'Levantate a buscar agua.',
    },
  },
  {
    interval: 120 * 60 * 1000,
    reminder: {
      emoji: '🚶',
      title: 'Hora de caminar',
      message: 'Caminá unos minutos.',
    },
  },
  {
    interval: 180 * 60 * 1000,
    reminder: {
      emoji: '🍎',
      title: 'Comé algo',
      message: 'Hacé una pausa y comé algo.',
    },
  },
];