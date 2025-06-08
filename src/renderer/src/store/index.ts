import { NavigationHistory, IDirectory } from '@shared/types'
import { atom } from 'jotai'
import { EmptyDirectory, EmptyNavigationHistory } from './mocks'
import { homeDirectoryKey } from '@shared/constants'

export const showHiddenItemsAtom = atom<boolean>(false)
export const openDirsAtom = atom<string[]>([homeDirectoryKey])

export const selectedContentItemAtom = atom<string>('')
export const selectedDirectoryKeyAtom = atom<string>(homeDirectoryKey)
export const directoriesDataAtom = atom<IDirectory>(EmptyDirectory)
export const currentDirDataAtom = atom<IDirectory>(EmptyDirectory)

export const navigationHistoryAtom = atom<NavigationHistory>(EmptyNavigationHistory)
