import { IpcMain, Notification } from 'electron/main'
import { getUserConfiguration, updateUserConfiguration } from './config'

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
}
