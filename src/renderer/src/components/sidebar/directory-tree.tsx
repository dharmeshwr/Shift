import { cn, isHiddenItem, updateDirectoriesData } from '@renderer/utils'
import { keyDelimiter } from '@shared/constants'
import { IDirectory } from '@shared/types'
import { SetStateAction, useAtom } from 'jotai'
import { ComponentProps, useLayoutEffect } from 'react'
import { IoCaretDownOutline as Arrow } from 'react-icons/io5'
import {
  directoriesDataAtom,
  openDirsAtom,
  selectedDirectoryKeyAtom,
  showHiddenItemsAtom
} from '@renderer/store'

export const DirectoryTree = (props: ComponentProps<'div'>): React.ReactElement => {
  const { directoriesData, setDirectoriesData, setShowHiddenItems } = useDirectoryTree()
  const { getDirectoryTreeData, getUserConfiguration, updateUserConfiguration } = window.api

  useLayoutEffect(() => {
    const fetchConfigAndData = async (): Promise<void> => {
      try {
        const config = await getUserConfiguration()
        if (config && config.showHidden) setShowHiddenItems(config.showHidden)

        const data = await getDirectoryTreeData()
        setDirectoriesData(data)
      } catch {
        //ignore
      }
    }

    const handleHiddenToggle = (event: KeyboardEvent): void => {
      if (event.target instanceof HTMLInputElement) return

      if (event.key === 'h' || event.key === 'H') {
        setShowHiddenItems((prev: boolean) => {
          updateUserConfiguration({ showHidden: !prev })
          return !prev
        })
      }
    }

    fetchConfigAndData()

    window.addEventListener('keydown', handleHiddenToggle)
    return () => {
      window.removeEventListener('keydown', handleHiddenToggle)
    }
  }, [])

  return (
    <div {...props}>
      <Directory dirs={directoriesData?.directories} depth={0} parentKey="*" />
    </div>
  )
}

export const Directory = ({
  dirs,
  depth,
  parentKey
}: {
  dirs: IDirectory[]
  depth: number
  parentKey: string
}): React.ReactElement => {
  const { showHiddenItems, select, toggle, isDirectoryOpen, isDirectorySelected } =
    useDirectoryTree()

  return (
    <div>
      {dirs?.map((dir: IDirectory, index: number) => {
        const key = `${parentKey}${keyDelimiter}${index}`

        if (isHiddenItem(dir.name) && !showHiddenItems) return null

        return (
          <div key={key}>
            <button
              className={cn(
                'w-full flex items-center text-left gap-2 cursor-pointer rounded-md',
                isDirectorySelected(key) && 'bg-background'
              )}
              style={{ paddingLeft: `calc(${depth * 14}px + 7px)` }}
            >
              <span onClick={() => toggle(key, dir.path)} className="py-2 group">
                <Arrow
                  className={cn(
                    isDirectoryOpen(key) ? 'rotate-0' : '-rotate-90',
                    'transition-all ease-in-out group-hover:text-highlight'
                  )}
                />
              </span>
              <span onClick={() => select(key, dir.path)} className="py-1 w-full">
                {dir.name}
              </span>
            </button>

            {dir.directories && dir.directories?.length > 0 ? (
              <div className="flex flex-col">
                {isDirectoryOpen(key) && (
                  <Directory dirs={dir.directories} depth={depth + 1} parentKey={key} />
                )}
              </div>
            ) : (
              isDirectoryOpen(key) && (
                <span
                  className="text-xs italic"
                  style={{ paddingLeft: `calc(${depth * 14}px + 45px)` }}
                >
                  {'<'}No subfolders{'>'}
                </span>
              )
            )}
          </div>
        )
      })}
    </div>
  )
}

function useDirectoryTree(): {
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
