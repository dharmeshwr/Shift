import { isHiddenItem } from '@renderer/utils'
import { ComponentProps } from 'react'
import { FiFolder as Folder } from 'react-icons/fi'
import { FiFile as File } from 'react-icons/fi'
import { IDirectory } from '@shared/types'
import { keyDelimiter } from '@shared/constants'
import { ContentItem } from './content-item'
import { useContent } from './use-content'

export const Content = (props: ComponentProps<'div'>): React.ReactElement => {
  const {
    currentDirData,
    showHiddenItem,
    isSelected,
    setSelectedItem,
    handleDoubleClick,
    selectedDirectoryKey
  } = useContent()

  return (
    <div className="flex flex-wrap p-5 gap-4 pb-24" onClick={(e) => e.stopPropagation()} {...props}>
      {currentDirData?.files.map((item: string, i: number) => {
        const key = `file${keyDelimiter}${i}`

        if (isHiddenItem(item) && !showHiddenItem) return null
        return (
          <ContentItem
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
          <ContentItem
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

