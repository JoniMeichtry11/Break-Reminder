import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, screen } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { startScheduler } from '../src/scheduler/scheduler'
import type { Reminder } from '../src/types/reminder'

const __dirname = path.dirname(fileURLToPath(import.meta.url))


process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null = null
let tray: Tray | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const testReminder: Reminder = {
  emoji: '⏱️',
  title: 'Recordatorio de prueba',
  message: 'Esta es una prueba del overlay.',
}

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.bounds

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width,
    height,
    show: false,
    frame: false,
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    autoHideMenuBar: true,
    backgroundColor: '#121212',
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

function createTray() {
  const iconPath = path.join(process.env.VITE_PUBLIC, 'icon.png')
  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon)
  tray.setToolTip('Break Reminder')


  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar prueba',
      click: () => {
        showOverlay(testReminder)
      },
    },
    { type: 'separator' },
    {
      label: 'Salir',
      click: () => {
        app.quit()
      },
    },
  ])

  tray.setContextMenu(contextMenu)
}

function setupAutoLaunch() {
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
  })
}

function showOverlay(reminder: Reminder) {
  if (!win) return

  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }

  const primaryDisplay = screen.getPrimaryDisplay()
  const { x, y, width, height } = primaryDisplay.bounds

  win.setBounds({ x, y, width, height })
  win.setAlwaysOnTop(true, 'screen-saver')
  win.setKiosk(true)
  win.show()
  win.focus()
  win.webContents.send('reminder', reminder)

  hideTimeout = setTimeout(() => {
    hideOverlay()
  }, 10000)
}

function hideOverlay() {
  if (!win) return

  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }

  win.webContents.send('hide-overlay')
  win.hide()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('show-overlay', () => {
  showOverlay(testReminder)
})

ipcMain.on('hide-overlay', () => {
  hideOverlay()
})

app.whenReady().then(() => {
  createWindow()
  createTray()
  setupAutoLaunch()

  startScheduler((reminder) => {
    showOverlay(reminder)
  })
})