import { IDirectory } from '@shared/types'
import { atom } from 'jotai'

export const selectedDirectoryInTreeAtom = atom<string>('')
export const selectedItemInContentAtom = atom<string>('')
export const directoryTreeAtom = atom<IDirectory>({ name: '', path: '', directories: [] })
export const showHiddenItemsAtom = atom<boolean>(false)
