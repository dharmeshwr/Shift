import { IDirectory, Config, NavigationHistory } from '../shared/types'

declare global {
  interface Window {
    api: {
      ping: () => void

      getUserConfiguration: () => Promise<Config>
      updateUserConfiguration: (content: object) => Promise<boolean>

      getUserDirectoryAndFiles: (path: string) => Promise<IDirectory>
      getDirectoryTreeData: () => Promise<IDirectory>

      getSavedNavigationHistory: () => Promise<NavigationHistory>
      saveNavigationHistory: (data: NavigationHistory) => Promise<void>
      getCurrent: () => Promise<string>
    }
  }
}
