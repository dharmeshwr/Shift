import { twMerge } from 'tailwind-merge'
import { ClassValue, clsx } from 'clsx'
import { keyDelimiter } from '@shared/constants'
import { IDirectory, NavigationHistory } from '@shared/types'
import { SetStateAction } from 'jotai'

export const cn = (...classes: ClassValue[]): string => twMerge(clsx(...classes))

export const isHiddenItem = (item: string): boolean => item.startsWith('.')

export const truncate = (string: string): string => {
  return string.length > 30
    ? string.slice(0, 20) + '...' + string.slice(string.length - 7, string.length)
    : string
}

export const updateDirectoriesData = async (
  key: string,
  path: string,
  setDirectoriesData: SetAtom<[SetStateAction<IDirectory | null>], void>
): Promise<void> => {
  const { getUserDirectoryAndFiles } = window.api

  try {
    const data = await getUserDirectoryAndFiles(path)
    const pathFromIndex = key.split(keyDelimiter).splice(1).map(Number)

    setDirectoriesData((prev: IDirectory) => {
      if (!prev) return prev

      const clone = structuredClone(prev)
      let node = clone?.directories

      for (let i = 0; i < pathFromIndex.length; i++) {
        const idx = pathFromIndex[i]

        if (i == pathFromIndex.length - 1) {
          node[idx].directories = data.directories
          node[idx].files = data.files
        } else {
          node = node[idx].directories
        }
      }
      return clone
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateNavigationHistory = (
  updatedkey: string,
  setNavigationHistory: SetAtom<[SetStateAction<NavigationHistory | null>], void>
): void => {
  const { saveNavigationHistory } = window.api
  setNavigationHistory((prev: NavigationHistory) => {
    const { forward, backward, current } = prev
    const data = {
      backward: [...backward, current],
      current: updatedkey,
      forward
    }
    console.log(data)
    saveNavigationHistory(data)
    return data
  })
}

export const updateOpenDirs = (
  key: string,
  setOpenDirs: SetAtom<[SetStateAction<NavigationHistory | null>], void>
): void => {
  setOpenDirs((prev: string[]) => {
    const alreadyOpen = prev.includes(key)
    if (alreadyOpen) {
      return prev.filter((openKey) => openKey !== key)
    }

    const newDirs = [...prev, key]

    // edge case
    const parentKey = key.slice(0, -2)
    if (!prev.includes(parentKey)) newDirs.push(parentKey)

    return newDirs
  })
}

export const Capatilize = (string: string): string => {
  return string.slice(0, 1).toUpperCase() + string.slice(1, string.length).toLowerCase()
}
