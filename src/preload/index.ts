import { contextBridge } from 'electron'
import { ipcRenderer } from 'electron/renderer'

const api = {
  ping: (...args: Array<unknown>) => ipcRenderer.invoke('ping', ...args),
  getUserConfiguration: () => ipcRenderer.invoke('config:get'),
  updateUserConfiguration: (content: object) => ipcRenderer.invoke('config:update', content)
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
