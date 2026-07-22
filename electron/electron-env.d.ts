/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

interface Window {
  breakReminder: {
    showOverlay: () => void
    hideOverlay: () => void
    onReminder: (listener: (reminder: import('../src/types/reminder').Reminder) => void) => () => void
    onHideOverlay: (listener: () => void) => () => void
  }
}
