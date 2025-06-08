import { cn, isHiddenItem } from '@renderer/utils'
import { ComponentProps, useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { currentDirDataAtom, selectedContentItemAtom } from '@renderer/store'
import { HiddenLabel } from './ui/hidden-label'
import { ThemeSwitcher } from './theme-switcher'
import { keyDelimiter } from '@shared/constants'

export const Footer = ({ className, ...rest }: ComponentProps<'div'>): React.ReactElement => {
  const currentDirData = useAtomValue(currentDirDataAtom)
  const selectedContentItem = useAtomValue(selectedContentItemAtom)
  const [leftlabel, setLeftLabel] = useState('')
  const [data, setData] = useState({
    items: 0,
    hidden_items: 0,
    free: 0,
    total: 0
  })

  useEffect(() => {
    const hiddenDirCount =
      currentDirData?.directories.reduce((acc, curr) => {
        return acc + (isHiddenItem(curr.name) ? 1 : 0)
      }, 0) ?? 0

    const hiddenFileCount =
      currentDirData?.files.reduce((acc, curr) => {
        return acc + (isHiddenItem(curr.name) ? 1 : 0)
      }, 0) ?? 0

    const totalVisibleItems =
      (currentDirData?.directories.length ?? 0) - hiddenDirCount +
      (currentDirData?.files.length ?? 0) - hiddenFileCount

    setData((prev) => ({
      ...prev,
      items: totalVisibleItems,
      hidden_items: hiddenDirCount + hiddenFileCount
    }))
  }, [currentDirData])

  useEffect(() => {

    setLeftLabel(() => {
      if (selectedContentItem.length == 0) return ""
      const [type, name, key] = selectedContentItem.split(keyDelimiter)
      if (type === 'file') return `"${name}" (${key})`
      else return `"${name}" Folder`
    })
  }, [selectedContentItem])

  useEffect(() => {
    const fetchSize = async (): Promise<void> => {
      const diskSize = await window.api.getDiskDetails()
      setData((prev) => ({
        ...prev,
        free: diskSize.free,
        total: diskSize.total
      }))
    }

    fetchSize()
  }, [])

  return (
    <div
      className={cn('absolute bottom-0 w-full flex items-center justify-center', className)}
      {...rest}
    >
      <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-300">
        {leftlabel.length === 0 ? (
          <div>
            <span>{data.items} items</span>
            <span> ({data.hidden_items} hidden)</span>
          </div>
        ) : (
          <span>{leftlabel}</span>
        )}

        <HiddenLabel />

        <div>
          <span>Free space: {data.free}</span>
          <span> (Total: {data.total})</span>
        </div>
      </div>

      <ThemeSwitcher />
    </div>
  )
}
