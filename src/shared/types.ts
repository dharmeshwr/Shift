export type Directory = {
  name: string
  directories?: Directory[]
  files?: string[]
}

export type Places = {
  main: string[]
  xdgs: Directory[]
}
