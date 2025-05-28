import { NavigationHistory } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

const api = {
  ping: (...args: Array<unknown>) => ipcRenderer.invoke('ping', ...args),

  getUserConfiguration: () => ipcRenderer.invoke('config:get'),
  updateUserConfiguration: (content: object) => ipcRenderer.invoke('config:update', content),

  getUserDirectoryAndFiles: (path: string) => ipcRenderer.invoke('fs:get-list', path),
  getDirectoryTreeData: () => ipcRenderer.invoke('fs:get-tree'),

  getSavedNavigationHistory: () => ipcRenderer.invoke('navigation:get'),
  saveNavigationHistory: (data: NavigationHistory) => ipcRenderer.invoke('navigation:save', data),
  getCurrent: () => ipcRenderer.invoke('navigation:current')
}

if (!process.contextIsolated) {
  throw new Error('Context isolation must be enabled in the browser window')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
}
