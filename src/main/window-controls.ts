import { BrowserWindow, ipcMain } from 'electron'

const CHANNEL = {
  MINIMIZE: 'window:minimize',
  MAXIMIZE: 'window:maximize',
  CLOSE: 'window:close',
  IS_MAXIMIZED: 'window:is-maximized',
  MAXIMIZED_CHANGED: 'window:maximized-changed'
} as const

export function registerWindowControlHandlers(): void {
  ipcMain.on(CHANNEL.MINIMIZE, (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize()
  })

  ipcMain.on(CHANNEL.MAXIMIZE, (event) => {
    const window = BrowserWindow.fromWebContents(event.sender)
    if (!window) return

    if (window.isMaximized()) {
      window.unmaximize()
    } else {
      window.maximize()
    }
  })

  ipcMain.on(CHANNEL.CLOSE, (event) => {
    BrowserWindow.fromWebContents(event.sender)?.close()
  })

  ipcMain.handle(CHANNEL.IS_MAXIMIZED, (event) => {
    return BrowserWindow.fromWebContents(event.sender)?.isMaximized() ?? false
  })
}

export function attachWindowStateEvents(window: BrowserWindow): void {
  const notify = (maximized: boolean): void => {
    window.webContents.send(CHANNEL.MAXIMIZED_CHANGED, maximized)
  }

  window.on('maximize', () => notify(true))
  window.on('unmaximize', () => notify(false))
}
