import { ipcRenderer, contextBridge } from 'electron'
import type { Reminder } from '../src/types/reminder'

contextBridge.exposeInMainWorld('breakReminder', {
  showOverlay() {
    ipcRenderer.send('show-overlay')
  },
  hideOverlay() {
    ipcRenderer.send('hide-overlay')
  },
  onReminder(listener: (reminder: Reminder) => void) {
    const handler = (_event: unknown, reminder: Reminder) => listener(reminder)
    ipcRenderer.on('reminder', handler)
    return () => {
      ipcRenderer.removeListener('reminder', handler)
    }
  },
  onHideOverlay(listener: () => void) {
    const handler = () => listener()
    ipcRenderer.on('hide-overlay', handler)
    return () => {
      ipcRenderer.removeListener('hide-overlay', handler)
    }
  },
})

