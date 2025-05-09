import { selectedDirectoryInTreeAtom } from '@renderer/store'
import { cn } from '@renderer/utils'
import { Directory } from '@shared/types'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { IoCaretDownOutline as DownArrow } from 'react-icons/io5'

export const DirectoryTree = ({
  dirs,
  depth = 0.5
}: {
  dirs: Directory[]
  depth?: number
}): React.ReactElement => {
  const [openDirs, setOpenDirs] = useState<string[]>([])
  const [selected, setSelected] = useAtom(selectedDirectoryInTreeAtom)
  const { getUserConfiguration, updateUserConfiguration } = window.api

  const isDirectoryOpen = (key: string): boolean => {
    return openDirs.includes(key)
  }

  const isDirectorySelected = (key: string): boolean => {
    return selected === key
  }

  const toggle = (dirKey: string): void => {
    setOpenDirs((prev) => {
      const newDirs = isDirectoryOpen(dirKey)
        ? prev.filter((openKey) => openKey !== dirKey)
        : [...prev, dirKey]

      updateUserConfiguration({ sidebarOpenDirs: newDirs })
      return newDirs
    })
  }

  useEffect(() => {
    ; (async () => {
      try {
        const data = await getUserConfiguration()
        if (data.sidebarOpenDirs) setOpenDirs(data.sidebarOpenDirs)
      } catch {
        setOpenDirs([])
      }
    })()
  }, [])

  return (
    <div>
      {dirs.map((item, i) => {
        const key = `${depth}_${item.name}_${i}`
        return (
          <div key={key}>
            <button
              className={cn(
                'w-full flex items-center text-left gap-2 cursor-pointer rounded-md',
                isDirectorySelected(key) && 'bg-background'
              )}
              style={{ paddingLeft: `${depth * 15}px` }}
            >
              <span onClick={() => toggle(key)} className="py-2 group">
                <DownArrow
                  className={cn(
                    isDirectoryOpen(key) ? 'rotate-0' : '-rotate-90',
                    'transition-all ease-in-out group-hover:text-highlight'
                  )}
                />
              </span>
              <span className="py-1 w-full" onClick={() => setSelected(key)}>
                {item.name}
              </span>
            </button>
            {isDirectoryOpen(key) && (
              <div className="flex flex-col">
                {item.directories.length > 0 && (
                  <DirectoryTree dirs={item.directories} depth={depth + 1} />
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
