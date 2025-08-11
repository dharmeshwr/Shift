import path from 'node:path'
import fs from 'fs-extra'
import { homeDirectory } from './config'

export const getXdgDirectories = async (): Promise<Record<string, string>> => {
  const configDir = path.join(homeDirectory, '.config')

  const xdgDirs = {
    HOME: homeDirectory,
    DESKTOP: path.join(homeDirectory, 'Desktop'),
    DOWNLOAD: path.join(homeDirectory, 'Downloads'),
    DOCUMENTS: path.join(homeDirectory, 'Documents'),
    MUSIC: path.join(homeDirectory, 'Music'),
    PICTURES: path.join(homeDirectory, 'Pictures'),
    VIDEOS: path.join(homeDirectory, 'Videos'),
    TEMPLATES: path.join(homeDirectory, 'Templates'),
    PUBLICSHARE: path.join(homeDirectory, 'Public')
  }

  try {
    const userConfigPath = path.join(configDir, 'user-dirs.dirs')
    let configContent: any

    try {
      await fs.access(userConfigPath)
      configContent = await fs.readFile(userConfigPath, 'utf-8')
    } catch {
      const systemConfigPath = '/etc/xdg/user-dirs.defaults'
      await fs.access(systemConfigPath)
      configContent = fs.readFile(systemConfigPath, 'utf-8')
    }

    const lines = configContent.split('\n')
    for (const line of lines) {
      if (!line || line.startsWith('#')) continue

      const match = line.match(/^XDG_(\w+)_DIR=["']?([^"']+)["']?$/)
      if (match) {
        const [, key, value] = match
        const resolvedPath = value.replace('$HOME', homeDirectory)
        xdgDirs[key] = path.resolve(resolvedPath)
      }
    }

    return xdgDirs
  } catch {
    console.warn('Failed to read XDG directories, returning defaults:')
    return xdgDirs
  }
}
