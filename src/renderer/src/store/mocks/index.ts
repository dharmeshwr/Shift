import { homeDirectoryKey } from '@shared/constants'
import { IDirectory, IPlaces, NavigationHistory } from '@shared/types'

export const EmptyDirectory: IDirectory = {
  name: '',
  path: '',
  directories: [],
  files: []
}

export const EmptyNavigationHistory: NavigationHistory = {
  backward: [],
  forward: [],
  current: homeDirectoryKey
}

export const placesMock: IPlaces = {
  main: ['Home', 'Desktop', 'Trash Can', 'Applications'],
  xdgs: [
    { name: 'Documents', path: '' },
    { name: 'Downloads', path: '' },
    { name: 'Pictures', path: '' },
    { name: 'Videos', path: '' },
    { name: 'Public', path: '' },
    { name: 'Templates', path: '' }
  ]
}
