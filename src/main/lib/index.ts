import { IpcMain, Notification } from 'electron/main'
import { getUserConfiguration, updateUserConfiguration } from './config'
import { getDirectoryTreeData, getDiskDetails, getUserDirectoryAndFiles } from './directory'
import { getCurrent, getSavedNavigationHistory, saveNavigationHistory } from './navigation'
import { getXdgDirectories } from './places'

function sendIPCNotification(...args: Array<unknown>): void {
  const NOTIFICATION_TITLE = 'PING PONG'
  const NOTIFICATION_BODY = `🤗 IPC is working fine \n arguments: ${JSON.stringify(args)}`

  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

export function setupIPC(ipcMain: IpcMain): void {
  //IPC test
  ipcMain.handle('ping', (_, ...args) => sendIPCNotification(...args))

  ipcMain.handle('config:get', () => getUserConfiguration())
  ipcMain.handle('config:update', (_, content) => updateUserConfiguration(content))

  ipcMain.handle('fs:get-list', (_, path) => getUserDirectoryAndFiles(path))
  ipcMain.handle('fs:get-tree', () => getDirectoryTreeData())
  ipcMain.handle('fs:get-size', () => getDiskDetails())

  ipcMain.handle('navigation:get', () => getSavedNavigationHistory())
  ipcMain.handle('navigation:save', (_, data) => saveNavigationHistory(data))
  ipcMain.handle('navigation:current', () => getCurrent())

  ipcMain.handle('fs:get-xdg', () => getXdgDirectories())
}
