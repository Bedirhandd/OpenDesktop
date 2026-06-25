import { ElectronAPI } from '@electron-toolkit/preload'
import type { DesktopAPI } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: DesktopAPI
  }
}

export {}
