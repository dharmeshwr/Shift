import { selectedItemInContentAtom } from '@renderer/store'
import { directoryTreeMock } from '@renderer/store/mocks'
import { cn } from '@renderer/utils'
import { useAtom } from 'jotai'
import { ComponentProps, useEffect } from 'react'
import { FaRegFolderClosed as Folder } from 'react-icons/fa6'

export const Content = (props: ComponentProps<'div'>): React.ReactElement => {
  const [selectedItem, setSelectedItem] = useAtom(selectedItemInContentAtom)

  useEffect(() => {
    const handleClickOutside = (): void => {
      if (selectedItem) {
        setSelectedItem('')
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [selectedItem, setSelectedItem])

  return (
    <div className="flex flex-wrap p-5 gap-4" onClick={(e) => e.stopPropagation()} {...props} >
      {directoryTreeMock[0].directories.map((item, i) => (
        <button
          key={i}
          onClick={() => setSelectedItem(`${i}`)}
          className={cn(
            'rounded-md size-36 hover:bg-background-muted text-foreground-base cursor-pointer transition-colors',
            selectedItem === `${i}` && 'bg-highlight/40 border-3 border-highlight hover:bg-highlight/50',
            'flex flex-col justify-center p-2'
          )}
        >
          <Folder className="size-1/2 flex-1 self-center " />
          <span> {item.name} </span>
        </button>
      ))}
    </div>
  )
}
