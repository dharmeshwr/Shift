export type Directory = {
  name: string
  directories: Directory[]
  files?: string[]
}

export type Places = {
  main: string[]
  xdgs: Directory[]
}

export enum SidebarView {
  Places = 'Places',
  DirectoryTree = 'Directory Tree'
}

export enum Theme {
  Default = '',
  Gruvbox = 'gruvbox',
  Catppuccin = 'catppuccin',
  TokyoNight = 'tokyo-night',
  NightOwl = 'night-owl',
  OneDark = 'one-dark',
  Solarized = 'solarized',
  Nord = 'nord'
}
