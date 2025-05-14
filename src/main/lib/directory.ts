import { fileEncoding } from '../../shared/constants'
import { IDirectory } from '../../shared/types'
import { readdir, stat } from 'fs/promises'
import { homeDirectory } from './config'

export const getUserDirectoryAndFiles = async (path: string): Promise<IDirectory> => {
  const data = await readdir(path, { encoding: fileEncoding })

  const results = await Promise.all(
    data.map(async (item) => {
      const isDirectory = (await stat(`${path}/${item}`)).isDirectory()
      return { name: item, isDirectory }
    })
  )

  const directories: IDirectory[] = []
  const files: string[] = []

  results.forEach((item) => {
    if (item.isDirectory) {
      directories.push({
        name: item.name,
        path: path === '/' ? `${path}${item.name}` : `${path}/${item.name}`,
        directories: [],
        files: []
      })
    } else {
      files.push(item.name)
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
