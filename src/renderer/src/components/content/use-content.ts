import {
  currentDirDataAtom,
  directoriesDataAtom,
  navigationHistoryAtom,
  openDirsAtom,
  selectedContentItemAtom,
  selectedDirectoryKeyAtom,
  showHiddenItemsAtom,
  viewAtom
} from '@renderer/store'
import { updateDirectoriesData, updateNavigationHistory, updateOpenDirs } from '@renderer/utils'
import { keyDelimiter } from '@shared/constants'
import { IDirectory, SidebarView } from '@shared/types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Ref, useEffect, useRef } from 'react'

interface UseContentReturn {
  currentDirData: IDirectory
  showHiddenItem: boolean
  isSelected: (key: string) => boolean
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
  handleDoubleClick: (key: string, type: string, path?: string) => void
  selectedDirectoryKey: string
  contentContainerRef: Ref<HTMLDivElement | null>
}
export const useContent = (): UseContentReturn => {
  const [selectedItem, setSelectedItem] = useAtom(selectedContentItemAtom)

  const [currentDirData, setCurrentDirData] = useAtom(currentDirDataAtom)
  const [selectedDirectoryKey, setSelectedDirectoryKey] = useAtom(selectedDirectoryKeyAtom)
  const [directoriesData, setDirectoriesData] = useAtom(directoriesDataAtom)

  const setOpenDirs = useSetAtom(openDirsAtom)
  const setNavigationHistory = useSetAtom(navigationHistoryAtom)
  const setSelectedContentItem = useSetAtom(selectedContentItemAtom)

  const showHiddenItem = useAtomValue(showHiddenItemsAtom)
  const view = useAtomValue(viewAtom)

  const isSelected = (key: string): boolean => key == selectedItem

  const handleDoubleClick = async (key: string, type: string, path?: string): Promise<void> => {
    if (type === 'file' || !path) return

    if (view === SidebarView.Places) {
      const { getUserDirectoryAndFiles } = window.api
      const data = await getUserDirectoryAndFiles(path)
      setCurrentDirData(data)
    }

    if (view === SidebarView.DirectoryTree) {
      await updateDirectoriesData(key, path, setDirectoriesData)
      updateNavigationHistory(key, setNavigationHistory)

      setSelectedDirectoryKey(key)

      updateOpenDirs(key, setOpenDirs)
    }
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

  const contentContainerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!event.target.closest['[data-item]']) {
        setSelectedItem('')
        setSelectedContentItem('')
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  return {
    currentDirData,
    showHiddenItem,
    isSelected,
    setSelectedItem,
    handleDoubleClick,
    selectedDirectoryKey,
    contentContainerRef
  }
}
