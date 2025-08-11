import { currentDirDataAtom } from '@renderer/store'
import { Capatilize } from '@renderer/utils'
import { useSetAtom } from 'jotai'
import { ComponentProps, useLayoutEffect, useState } from 'react'

export const Places = (props: ComponentProps<'div'>): React.ReactElement => {
  const { getXdgDirectories, getUserDirectoryAndFiles } = window.api
  const [places, setPlaces] = useState({})
  const [selectedItem, setSelectedItem] = useState('HOME')
  const setCurrentDirData = useSetAtom(currentDirDataAtom)

  const getContent = async (path: string, key: string) => {
    const data = await getUserDirectoryAndFiles(path)
    setCurrentDirData(data)
    setSelectedItem(key)
  }

  useLayoutEffect(() => {
    (async () => {
      const data = await getXdgDirectories()
      setPlaces(data)
      if (data.HOME) {
        const homeData = await getUserDirectoryAndFiles(data.HOME)
        setCurrentDirData(homeData)
      }
    })()
  }, [])

  return (
    <div {...props}>
      <div className="flex flex-col gap-1 ">
        <button
          className={`cursor-pointer px-2 py-1 text-start rounded-md ${selectedItem === 'HOME' ? 'bg-background' : 'hover:bg-background'}`}
          onClick={() => getContent(places.HOME, 'HOME')}
        >
          Home
        </button>
        <button
          className={`cursor-pointer px-2 py-1 text-start rounded-md ${selectedItem === 'DESKTOP' ? 'bg-background' : 'hover:bg-background'}`}
          onClick={() => getContent(places.DESKTOP, 'DESKTOP')}
        >
          Desktop
        </button>
        <button
          className={`cursor-pointer px-2 py-1 text-start rounded-md ${selectedItem === 'TRASH' ? 'bg-background' : 'hover:bg-background'}`}
          onClick={() => getContent(`${places.HOME}/.local/share/Trash/files`, 'TRASH')}
        >
          Trash bin
        </button>
      </div>
      <div className="pt-2 flex flex-col gap-1 border-t border-t-foreground-base/30">
        {Object.entries(places).map(([key, value], i: number) => {
          if (key === 'HOME' || key === 'DESKTOP' || value === places.HOME) return null
          return (
            <button
              key={i}
              className={`cursor-pointer px-2 py-1 text-start transition-colors  rounded-md ${selectedItem === key ? 'bg-background' : 'hover:bg-background'}`}
              onClick={() => getContent(value, key)}
            >
              {key === 'PUBLICSHARE' ? 'Public' : Capatilize(key)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
