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
    {
      name: 'Documents',
      path: '',
      directories: [],
      files: ['shiffman.pdf', 'profile.jpg', 'Dharmesh_Resume.pdf']
    },
    { name: 'Downloads', path: '', directories: [], files: [] },
    { name: 'Pictures', path: '', directories: [], files: [] },
    { name: 'Videos', path: '', directories: [], files: [] },
    { name: 'Public', path: '', directories: [], files: [] },
    { name: 'Templates', path: '', directories: [], files: [] }
  ]
}
