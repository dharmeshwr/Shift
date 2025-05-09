import { Select, SelectContent, SelectItem, SelectTrigger } from './select'
import { SidebarView } from '@shared/types'
import { useState } from 'react'
import { Places } from './places'
import { DirectoryTree } from './directory-tree'
import { directoryTreeMock } from '@renderer/store/mocks'

export const Sidebar = (): React.ReactElement => {
  const [view, setView] = useState<SidebarView>(SidebarView.Places)

  return (
    <div className="p-2">
      <Select value={view} onChange={(val) => setView(val as SidebarView)}>
        <SelectTrigger placeholder={view} />
        <SelectContent>
          <SelectItem value={SidebarView.Places}>{SidebarView.Places}</SelectItem>
          <SelectItem value={SidebarView.DirectoryTree}>{SidebarView.DirectoryTree}</SelectItem>
        </SelectContent>
      </Select>
      {view === SidebarView.Places && <Places />}
      {view === SidebarView.DirectoryTree && (
        <div className="py-1.5">
          <DirectoryTree dirs={directoryTreeMock} />
        </div>
      )}
    </div>
  )
}
