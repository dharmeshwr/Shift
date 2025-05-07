import { fileEncoding } from '@shared/constants'
import { app } from 'electron'
import { readFileSync, statSync } from 'fs'
import { ensureFile, writeFileSync } from 'fs-extra'
import { homedir } from 'os'
import { resolve, join } from 'path'

const homeDirectory = homedir()
const configFileName = 'shift.json'
const isDev = false

let configDirectory = process.env.XDG_CONFIG_HOME
  ? join(process.env.XDG_CONFIG_HOME, 'Shift')
  : process.platform == 'win32'
    ? app.getPath('userData')
    : join(homeDirectory, '.config', 'Shift')

let configFile = join(configDirectory, configFileName)

const devDirectory = resolve(__dirname, '../../..')
const devConfigFile = resolve(devDirectory, configFileName)

if (isDev) {
  try {
    statSync(devConfigFile)
    configFile = devConfigFile
    configDirectory = devDirectory
  } catch {
    //ignore
  }
}

async function getUserConfiguration(): Promise<object> {
  try {
    await ensureFile(configFile)
    const rawFileData = readFileSync(configFile, { encoding: fileEncoding })
    const fileData = rawFileData.length > 0 ? JSON.parse(rawFileData) : {}
    return fileData
  } catch (error) {
    console.log('Error while getting configuration', error)
    return {
      error: 'Something wrong in your configuration'
    }
  }
}

async function updateUserConfiguration(content: object): Promise<boolean> {
  try {
    await ensureFile(configFile)
    const configuration = await getUserConfiguration()
    const updatedConfiguration = { ...configuration, ...content }
    const fileData = JSON.stringify(updatedConfiguration)
    writeFileSync(configFile, fileData, { encoding: fileEncoding })
    return true
  } catch (error) {
    console.log('Error while updating configuration', error)
    return false
  }
}

export {
  configDirectory,
  configFileName,
  configFile,
  getUserConfiguration,
  updateUserConfiguration,
  homeDirectory,
  isDev
}
