import { Directory, Places } from '@shared/types'

export const placesMock: Places = {
  main: ['Home', 'Desktop', 'Trash Can', 'Applications'],
  xdgs: [
    {
      name: 'Documents',
      files: ['shiffman.pdf', 'profile.jpg', 'Dharmesh_Resume.pdf']
    },
    { name: 'Downloads' },
    { name: 'Pictures' },
    { name: 'Videos' },
    { name: 'Public' },
    { name: 'Templates' }
  ]
}

export const directoryTreeMock: Directory[] = [
  {
    name: 'ninjafire',
    directories: [
      { name: 'Desktop', directories: [] },
      { name: 'Documents', directories: [] },
      {
        name: 'Downloads',
        directories: [
          { name: 'funnelSans', directories: [] },
          { name: 'Telegram_Desktop', directories: [] }
        ]
      },
      { name: 'Obsidian', directories: [] },
      { name: 'Pictures', directories: [] },
      { name: 'Workspace', directories: [] }
    ]
  },
  {
    name: '/',
    directories: [
      { name: 'bin', directories: [] },
      {
        name: 'boot',
        directories: [
          { name: 'EFI', directories: [] },
          {
            name: 'grub',
            directories: [
              { name: 'fonts', directories: [] },
              { name: 'locale', directories: [] },
              { name: 'themes', directories: [] }
            ]
          },
          { name: 'System Volume Information', directories: [] }
        ]
      },
      { name: 'dev', directories: [] },
      { name: 'etc', directories: [] },
      { name: 'home', directories: [] },
      { name: 'lib', directories: [] },
      { name: 'mnt', directories: [] },
      { name: 'opt', directories: [] }
    ]
  }
]
