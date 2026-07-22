import type { Reminder } from '../types/reminder';

const app = document.querySelector<HTMLDivElement>('#app');
let activeTimer: ReturnType<typeof setInterval> | null = null;

export function showOverlay(reminder: Reminder) {
  if (!app) return;

  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }

  let seconds = 10;

  app.innerHTML = `
    <main class="overlay">
      <div class="emoji">${reminder.emoji}</div>

      <h1>${reminder.title}</h1>

      <p>${reminder.message}</p>

      <div class="countdown">${seconds}</div>
    </main>
  `;

  const counter = document.querySelector('.countdown');

  activeTimer = setInterval(() => {
    seconds--;

    if (counter) {
      counter.textContent = String(seconds);
    }

    if (seconds <= 0) {
      if (activeTimer) {
        clearInterval(activeTimer);
        activeTimer = null;
      }
      hideOverlay();
      if (window.breakReminder?.hideOverlay) {
        window.breakReminder.hideOverlay();
      }
    }
  }, 1000);
}

export function hideOverlay() {
  if (activeTimer) {
    clearInterval(activeTimer);
    activeTimer = null;
  }
  if (app) {
    app.innerHTML = '';
  }
}