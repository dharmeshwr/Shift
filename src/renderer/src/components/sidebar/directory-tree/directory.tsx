import { IDirectory } from '@shared/types'
import { IoCaretDownOutline as Arrow } from 'react-icons/io5'
import { useDirectoryTree } from './use-directory-tree'
import { keyDelimiter } from '@shared/constants'
import { cn, isHiddenItem } from '@renderer/utils'

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

