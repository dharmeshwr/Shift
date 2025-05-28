import { updateDirectoriesData } from '@renderer/utils'
import { IDirectory } from '@shared/types'
import { SetStateAction, useAtom } from 'jotai'
import {
  directoriesDataAtom,
  openDirsAtom,
  selectedDirectoryKeyAtom,
  showHiddenItemsAtom
} from '@renderer/store'

export function useDirectoryTree(): {
  directoriesData: IDirectory
  setDirectoriesData: SetAtom<[SetStateAction<IDirectory | null>], void>
  showHiddenItems: boolean
  setShowHiddenItems: SetAtom<[SetStateAction<boolean>], void>
  select: (key: string, path: string) => Promise<void>
  toggle: (key: string, path: string) => Promise<void>
  isDirectoryOpen: (key: string) => boolean
  isDirectorySelected: (key: string) => boolean
} {
  const [openDirs, setOpenDirs] = useAtom(openDirsAtom)

  const [selectedDirectory, setSelectedDirectory] = useAtom(selectedDirectoryKeyAtom)
  const [directoriesData, setDirectoriesData] = useAtom(directoriesDataAtom)
  const [showHiddenItems, setShowHiddenItems] = useAtom(showHiddenItemsAtom)

  const isDirectoryOpen = (key: string): boolean => openDirs.includes(key)

  const isDirectorySelected = (key: string): boolean => selectedDirectory === key

  const toggle = async (key: string, path: string): Promise<void> => {
    await updateDirectoriesData(key, path, setDirectoriesData)
    setOpenDirs((prev) => {
      const newDirs = isDirectoryOpen(key)
        ? prev.filter((openKey) => openKey !== key)
        : [...prev, key]

      return newDirs
    })
  }

  const select = async (key: string, path: string): Promise<void> => {
    setSelectedDirectory(key)
    await updateDirectoriesData(key, path, setDirectoriesData)
  }

  return {
    directoriesData,
    setDirectoriesData,
    showHiddenItems,
    setShowHiddenItems,
    select,
    toggle,
    isDirectoryOpen,
    isDirectorySelected
  }
}
