import {
  directoriesDataAtom,
  openDirsAtom,
  selectedDirectoryKeyAtom,
  showHiddenItemsAtom
} from '@renderer/store'
import { cn, isHiddenItem, updateDirectoriesData } from '@renderer/utils'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ComponentProps, useEffect, useState } from 'react'
import { FiFolder as Folder } from 'react-icons/fi'
import { FiFile as File } from 'react-icons/fi'
import { IDirectory } from '@shared/types'
import { keyDelimiter } from '@shared/constants'
import { EmptyDirectory } from '@renderer/store/mocks'

export const Content = (props: ComponentProps<'div'>): React.ReactElement => {
  const [selectedItem, setSelectedItem] = useState('')
  const [currentDirData, setCurrentDirData] = useState(EmptyDirectory)

  const [selectedDirectoryKey, setSelectedDirectoryKey] = useAtom(selectedDirectoryKeyAtom)
  const [openDirs, setOpenDirs] = useAtom(openDirsAtom)
  const setDirectoriesData = useSetAtom(directoriesDataAtom)
  const directoriesData = useAtomValue(directoriesDataAtom)
  const showHiddenItem = useAtomValue(showHiddenItemsAtom)

  const isSelected = (key: string): boolean => key == selectedItem

  const handleDoubleClick = (key: string, type: string, path?: string): void => {
    if (type === 'file' || !path) return

    updateDirectoriesData(key, path, setDirectoriesData)
    setSelectedDirectoryKey(key)
    setOpenDirs((prev) => {
      const newDirs = openDirs.includes(key)
        ? prev.filter((openKey) => openKey !== key)
        : [...prev, key]

      return newDirs
    })

  }

  useEffect(() => {
    const getData = (): void => {
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

    getData()
  }, [selectedDirectoryKey, directoriesData])

  return (
    <div className="flex flex-wrap p-5 gap-4 pb-24" onClick={(e) => e.stopPropagation()} {...props}>
      {currentDirData?.files.map((item: string, i: number) => {
        const key = `file${keyDelimiter}${i}`

        if (isHiddenItem(item) && !showHiddenItem) return null
        return (
          <ItemButton
            key={key}
            icon={File}
            label={item}
            isSelected={isSelected(key)}
            onClick={() => setSelectedItem(key)}
            onDoubleClick={() => handleDoubleClick(key, 'file')}
          />
        )
      })}

      {currentDirData?.directories.map((item: IDirectory, i: number) => {
        const key = `${selectedDirectoryKey}${keyDelimiter}${i}`

        if (isHiddenItem(item.name) && !showHiddenItem) return null
        return (
          <ItemButton
            key={key}
            icon={Folder}
            label={item.name}
            isSelected={isSelected(key)}
            onClick={() => setSelectedItem(key)}
            onDoubleClick={() => handleDoubleClick(key, 'dir', item.path)}
          />
        )
      })}

    </div>
  )
}

type ItemButtonProps = {
  icon: React.ElementType
  label: string
  isSelected: boolean
  onClick: () => void
  onDoubleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ItemButton = ({
  icon: Icon,
  label,
  isSelected,
  onClick,
  onDoubleClick
}: ItemButtonProps): React.ReactElement => (
  <button
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    className={cn(
      'rounded-md size-28 hover:bg-background-muted text-foreground-base border-3 border-background cursor-pointer transition-colors',
      isSelected && 'bg-highlight/40 duration-100 border-highlight hover:bg-highlight/50',
      'flex flex-col justify-center p-2 relative'
    )}
  >
    <Icon className="size-1/2 flex-1 self-center" />
    <span className={cn('truncate', 'overflow-auto break-words')}>{label}</span>
  </button>
)
