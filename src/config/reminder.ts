import type { Reminder } from '../types/reminder';

export interface ReminderConfig {
  interval: number;
  reminder: Reminder;
}

export const reminders: ReminderConfig[] = [
  {
    interval: 45 * 60 * 1000, // cada 45 min
    reminder: {
      emoji: '🧍',
      title: 'Hora de pararte',
      message: 'Levantate y cambiá de postura.',
    },
  },
  {
    interval: (45 * 60 * 1000) + (20 * 60 * 1000), // 20 min después
    reminder: {
      emoji: '💺',
      title: 'Hora de sentarte',
      message: 'Volvé a sentarte y acomodá tu postura.',
    },
  },
  {
    interval: 60 * 60 * 1000, // cada 1 hora
    reminder: {
      emoji: '👀',
      title: 'Descansá la vista',
      message: 'Mirar lejos durante unos segundos.',
    },
  },
  {
    interval: 75 * 60 * 1000, // nuevo: cada 1h15
    reminder: {
      emoji: '🖐️',
      title: 'Estirá las manos',
      message: 'Relajá muñecas y dedos con estiramientos.',
    },
  },
  {
    interval: 90 * 60 * 1000, // cada 1h30
    reminder: {
      emoji: '💧',
      title: 'Tomá agua',
      message: 'Levantate a buscar agua.',
    },
  },
  {
    interval: 120 * 60 * 1000, // cada 2h
    reminder: {
      emoji: '🚶',
      title: 'Hora de caminar',
      message: 'Caminá unos minutos.',
    },
  },
  {
    interval: 180 * 60 * 1000, // cada 3h
    reminder: {
      emoji: '🍎',
      title: 'Comé algo',
      message: 'Hacé una pausa y comé algo.',
    },
  }
];
