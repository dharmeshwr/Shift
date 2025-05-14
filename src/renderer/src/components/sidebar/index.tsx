import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SidebarView } from '@shared/types'
import { ComponentProps, useLayoutEffect, useState } from 'react'
import { Places } from './places'
import { DirectoryTree } from './directory-tree'

export const Sidebar = (props: ComponentProps<'div'>): React.ReactElement => {
  const [view, setView] = useState<SidebarView>(SidebarView.Places)
  const { getUserConfiguration, updateUserConfiguration } = window.api

  const updateView = (val: SidebarView): void => {
    setView(val)
    updateUserConfiguration({ sidebarView: val })
  }

  useLayoutEffect(() => {
    const fetchConfig = async (): Promise<void> => {
      try {
        const config = await getUserConfiguration()
        if (config && config.sidebarView) setView(config.sidebarView)
      } catch {
        setView(SidebarView.Places)
      }
    }
    fetchConfig()
  }, [])

  return (
    <div className="flex flex-col h-full p-2 relative" {...props}>
      {/* view changer */}
      <div className="z-10">
        <Select selectedValue={view} onChange={(val: SidebarView) => updateView(val)}>
          <SelectTrigger placeholder={view} />
          <SelectContent>
            {Object.entries(SidebarView).map(([key, value]) => (
              <SelectItem key={value} value={value}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* view */}
      <div className="flex flex-col overflow-hidden">
        <div className="overflow-auto pb-24 pt-2">
          {view === SidebarView.Places && <Places />}
          {view === SidebarView.DirectoryTree && <DirectoryTree />}
        </div>
      </div>
    </div>
  )
}
