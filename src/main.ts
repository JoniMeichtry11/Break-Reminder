import './style.css';
import { showOverlay, hideOverlay } from './overlay/ovelay';

if (window.breakReminder) {
  window.breakReminder.onReminder((reminder) => {
    showOverlay(reminder);
  });

  window.breakReminder.onHideOverlay(() => {
    hideOverlay();
  });
}