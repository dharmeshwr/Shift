import {
  currentDirDataAtom,
  directoriesDataAtom,
  navigationHistoryAtom,
  openDirsAtom,
  selectedDirectoryKeyAtom,
  showHiddenItemsAtom
} from '@renderer/store'
import { updateDirectoriesData, updateNavigationHistory, updateOpenDirs } from '@renderer/utils'
import { keyDelimiter } from '@shared/constants'
import { IDirectory } from '@shared/types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'

interface UseContentReturn {
  currentDirData: IDirectory
  showHiddenItem: boolean
  isSelected: (key: string) => boolean
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
  handleDoubleClick: (key: string, type: string, path?: string) => void
  selectedDirectoryKey: string
}
export const useContent = (): UseContentReturn => {
  const [selectedItem, setSelectedItem] = useState('')

  const [currentDirData, setCurrentDirData] = useAtom(currentDirDataAtom)
  const [selectedDirectoryKey, setSelectedDirectoryKey] = useAtom(selectedDirectoryKeyAtom)
  const [directoriesData, setDirectoriesData] = useAtom(directoriesDataAtom)

  const setOpenDirs = useSetAtom(openDirsAtom)
  const setNavigationHistory = useSetAtom(navigationHistoryAtom)

  const showHiddenItem = useAtomValue(showHiddenItemsAtom)

  const isSelected = (key: string): boolean => key == selectedItem

  const handleDoubleClick = async (key: string, type: string, path?: string): Promise<void> => {
    if (type === 'file' || !path) return

    await updateDirectoriesData(key, path, setDirectoriesData)
    updateNavigationHistory(key, setNavigationHistory)

    setSelectedDirectoryKey(key)

    updateOpenDirs(key, setOpenDirs)
  }

  useEffect(() => {
    const getData = async (): Promise<void> => {
      let node = directoriesData.directories
      const pathFromIndex = selectedDirectoryKey.split(keyDelimiter).slice(1)

      for (let i = 0; i < pathFromIndex.length; i++) {
        const idx = pathFromIndex[i]

        if (i == pathFromIndex.length - 1) {
          setCurrentDirData(node[idx])
        } else {
          node = node[idx].directories
        }
      }
    }

    try {
      getData()
    } catch {
      console.log('Error while getting data')
    }
  }, [selectedDirectoryKey, directoriesData])

  return {
    currentDirData,
    showHiddenItem,
    isSelected,
    setSelectedItem,
    handleDoubleClick,
    selectedDirectoryKey
  }
}
