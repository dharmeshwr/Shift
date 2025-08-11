import { isHiddenItem } from '@renderer/utils'
import { ComponentProps, useEffect, useRef } from 'react'
import { FiFolder as Folder } from 'react-icons/fi'
import { FiFile as File } from 'react-icons/fi'
import { IDirectory, IFile } from '@shared/types'
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
    selectedDirectoryKey,
    contentContainerRef
  } = useContent()


  return (
    <div className="p-5 pb-24" onClick={(e) => e.stopPropagation()} {...props}>
      <div className="flex gap-4 flex-wrap" ref={contentContainerRef}>
        {currentDirData?.directories.map((item: IDirectory, i: number) => {
          const key = `dir${keyDelimiter}${item.name}${keyDelimiter}${selectedDirectoryKey}${keyDelimiter}${i}`
          const indexPathKey = `${selectedDirectoryKey}${keyDelimiter}${i}`

          if (isHiddenItem(item.name) && !showHiddenItem) return null

          return (
            <ContentItem
              key={key}
              icon={Folder}
              label={item.name}
              isSelected={isSelected(key)}
              onClick={() => setSelectedItem(key)}
              onDoubleClick={() => handleDoubleClick(indexPathKey, 'dir', item.path)}
            />
          )
        })}

        {currentDirData?.files.map((item: IFile, i: number) => {
          const key = `file${keyDelimiter}${item.name}${keyDelimiter}${item.size}${keyDelimiter}${i}`

          if (isHiddenItem(item.name) && !showHiddenItem) return null

          return (
            <ContentItem
              key={key}
              icon={File}
              label={item.name}
              isSelected={isSelected(key)}
              onClick={() => setSelectedItem(key)}
              onDoubleClick={() => handleDoubleClick(key, 'file')}
            />
          )
        })}
      </div>

    </div>
  )
}

