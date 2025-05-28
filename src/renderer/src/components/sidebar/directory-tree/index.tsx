import { ComponentProps, useLayoutEffect } from 'react'
import { Directory } from './directory'
import { useDirectoryTree } from './use-directory-tree'

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

