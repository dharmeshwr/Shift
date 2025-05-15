import { IDirectory } from '@shared/types'
import { atom } from 'jotai'

export const openDirsAtom = atom(['*-0'])
export const selectedDirectoryKeyAtom = atom<string>('*-0')
export const directoriesDataAtom = atom<IDirectory>({
  name: '',
  path: '',
  directories: [],
  files: []
})
export const showHiddenItemsAtom = atom<boolean>(false)
