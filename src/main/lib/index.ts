import { IpcMain, Notification } from 'electron/main'

function sendIPCNotification(...args: Array<unknown>): void {
  const NOTIFICATION_TITLE = 'PING PONG'
  const NOTIFICATION_BODY = `🤗 IPC is working fine \n arguments: ${JSON.stringify(args)}`

  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

export function setupIPC(ipcMain: IpcMain): void {
  //IPC test
  ipcMain.handle('ping', (_, ...args) => sendIPCNotification(...args))
}
