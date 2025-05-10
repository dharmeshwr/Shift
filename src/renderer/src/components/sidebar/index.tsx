import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SidebarView } from '@shared/types'
import { ComponentProps, useEffect, useState } from 'react'
import { Places } from './places'
import { DirectoryTree } from './directory-tree'
import { directoryTreeMock } from '@renderer/store/mocks'

export const Sidebar = (props: ComponentProps<'div'>): React.ReactElement => {
  const [view, setView] = useState<SidebarView>(SidebarView.Places)
  const { getUserConfiguration, updateUserConfiguration } = window.api

  const updateView = (val: SidebarView): void => {
    setView(val)
    updateUserConfiguration({ sidebarView: val })
  }

  useEffect(() => {
    ; (async () => {
      try {
        const data = await getUserConfiguration()
        if (data.sidebarView) setView(data.sidebarView)
      } catch {
        setView(SidebarView.Places)
      }
    })()
  }, [])

  return (
    <div className="flex flex-col h-full p-2 relative" {...props}>
      {/* view changer */}
      <div className="z-10">
        <Select selectedValue={view} onChange={(val) => updateView(val)}>
          <SelectTrigger placeholder={view} />
          <SelectContent>
            <SelectItem value={SidebarView.Places}>{SidebarView.Places}</SelectItem>
            <SelectItem value={SidebarView.DirectoryTree}>{SidebarView.DirectoryTree}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* view */}
      <div className="flex flex-col overflow-hidden">
        <div className="overflow-scroll pb-24 pt-2">
          {view === SidebarView.Places && <Places />}
          {view === SidebarView.DirectoryTree && <DirectoryTree dirs={directoryTreeMock} />}
        </div>
      </div>
    </div>
  )
}
