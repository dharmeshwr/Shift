import { IDirectory, IPlaces } from '@shared/types'

export const EmptyDirectory: IDirectory = {
  name: '*',
  path: '*',
  directories: [],
  files: []
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
    { name: 'Downloads', path: '', directories: [] },
    { name: 'Pictures', path: '', directories: [] },
    { name: 'Videos', path: '', directories: [] },
    { name: 'Public', path: '', directories: [] },
    { name: 'Templates', path: '', directories: [] }
  ]
}

export const directoryTreeMock: IDirectory[] = [
  {
    name: 'ninjafire',
    path: '',
    directories: [
      { name: 'Desktop', path: '', directories: [] },
      { name: 'Documents', path: '', directories: [] },
      { name: 'Obsidian', path: '', directories: [] },
      { name: 'Pictures', path: '', directories: [] },
      { name: 'Workspace', path: '', directories: [] }
    ],
  },
  {
    name: '/',
    path: '',
    directories: [
      { name: 'bin', path: '', directories: [] },
      {
        name: 'boot',
        path: '',
        directories: [
          { name: 'EFI', path: '', directories: [] },
          {
            name: 'grub',
            directories: [
              { name: 'fonts', path: '', directories: [] },
              { name: 'locale', path: '', directories: [] },
              { name: 'themes', path: '', directories: [] }
            ],
            path: '',
          },
          { name: 'System Volume Information', path: '', directories: [] }
        ]
      },
      { name: 'dev', path: '', directories: [] },
      { name: 'etc', path: '', directories: [] },
      { name: 'home', path: '', directories: [] },
      { name: 'lib', path: '', directories: [] },
      { name: 'mnt', path: '', directories: [] },
      { name: 'opt', path: '', directories: [] }
    ]
  }
]
