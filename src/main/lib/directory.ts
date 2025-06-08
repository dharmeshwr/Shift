import { fileEncoding } from '../../shared/constants'
import { exec } from 'child_process'
import { DiskSize, IDirectory, IFile } from '../../shared/types'
import { readdir, stat } from 'fs/promises'
import { homeDirectory } from './config'

export const getUserDirectoryAndFiles = async (path: string): Promise<IDirectory> => {
  const data = await readdir(path, { encoding: fileEncoding })

  const results = await Promise.all(
    data.map(async (item) => {
      const stats = await stat(`${path}/${item}`)
      return { name: item, isDirectory: stats.isDirectory(), size: stats.size }
    })
  )

  const directories: IDirectory[] = []
  const files: IFile[] = []

  results.forEach((item) => {
    if (item.isDirectory) {
      directories.push({
        name: item.name,
        path: path === '/' ? `${path}${item.name}` : `${path}/${item.name}`,
        directories: [],
        files: []
      })
    } else {
      files.push({
        name: item.name,
        size: `${kbToMb(String(item.size)).toFixed(2)} MB`
      })
    }
  })

  const name = path.split('/').pop()

  return { name: name?.length ? name : path, path, directories, files }
}

export const getDirectoryTreeData = async (): Promise<IDirectory> => {
  const home = await getUserDirectoryAndFiles(homeDirectory)
  const rootDir = '/'
  const root = await getUserDirectoryAndFiles(rootDir)
  return { name: '*', path: '*', directories: [home, root], files: [] }
}

const kbToGb = (kb: string): number => parseInt(kb) / (1024 * 1024)
const kbToMb = (kb: string): number => parseInt(kb) / 1024

export const getDiskDetails = (): Promise<DiskSize | null> => {
  return new Promise((resolve, reject) => {
    const cmd = 'df -k /'
    exec(cmd, (error, stdout) => {
      if (error) {
        reject(error)
      }

      const lines = stdout.trim().split('\n')
      const parts = lines[1].trim().split(/\s+/)
      resolve({
        free: `${kbToGb(parts[3]).toFixed(2)} GB`,
        total: `${kbToGb(parts[1]).toFixed(2)} GB`
      })
    })
  })
}
