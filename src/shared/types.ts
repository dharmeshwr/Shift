export interface IDirectory {
  name: string
  path: string
  directories: IDirectory[]
  files: IFile[]
}

export interface IFile {
  name: string
  size: string
}

export interface IPlaces {
  main: string[]
  xdgs: IDirectory[]
}

export type DiskSize = { total: string; free: string }

export type NavigationHistory = {
  backward: string[]
  current: string
  forward: string[]
}

export type Config = {
  sidebarView?: SidebarView
  theme?: string
  showHidden?: string
}

export enum SidebarView {
  Places = 'Places',
  DirectoryTree = 'Directory Tree'
}

export enum Theme {
  Default = 'default',
  Gruvbox = 'gruvbox',
  Catppuccin = 'catppuccin',
  TokyoNight = 'tokyo-night',
  NightOwl = 'night-owl',
  OneDark = 'one-dark',
  Solarized = 'solarized',
  Nord = 'nord'
}
