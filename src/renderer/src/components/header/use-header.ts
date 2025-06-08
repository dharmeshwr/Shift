import {
  currentDirDataAtom,
  navigationHistoryAtom,
  openDirsAtom,
  selectedContentItemAtom,
  selectedDirectoryKeyAtom
} from '@renderer/store'
import { homeDirectoryKey } from '@shared/constants'
import { NavigationHistory } from '@shared/types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'

interface UseHeaderReturn {
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  InputRef: React.RefObject<HTMLInputElement | null>
  handleBackward: () => void
  handleForward: () => void
  handleHome: () => void
  handleSubmit: () => void
  navigationHistory: NavigationHistory
}
export const useHeader = (): UseHeaderReturn => {
  const InputRef = useRef<HTMLInputElement>(null)

  const setSelectedDirectoryKey = useSetAtom(selectedDirectoryKeyAtom)
  const setSelectedContentItem = useSetAtom(selectedContentItemAtom)
  const setOpenDirs = useSetAtom(openDirsAtom)
  const setCurrentDirData = useSetAtom(currentDirDataAtom)

  const currentDirData = useAtomValue(currentDirDataAtom)

  const [navigationHistory, setNavigationHistory] = useAtom(navigationHistoryAtom)
  const [inputValue, setInputValue] = useState<string>(currentDirData?.path)

  const handleBackward = (): void => {
    setNavigationHistory((prev) => {
      if (prev.backward.length === 0) return prev

      const { forward, backward, current } = prev
      const newCurrent = backward.pop() as string

      setSelectedContentItem('')
      setSelectedDirectoryKey(newCurrent)
      setOpenDirs((prev) => {
        return prev.filter((item) => item != current)
      })

      return {
        backward,
        current: newCurrent,
        forward: [current, ...forward]
      }
    })
  }

  const handleForward = (): void => {
    setNavigationHistory((prev) => {
      if (prev.forward.length === 0) return prev

      const { forward, backward, current } = prev
      const [newCurrent, ...newForward] = forward // u can also use shift()

      setSelectedContentItem('')
      setSelectedDirectoryKey(newCurrent)

      return {
        backward: [...backward, current],
        current: newCurrent,
        forward: newForward
      }
    })
  }

  const handleHome = (): void => {
    if (navigationHistory.current === homeDirectoryKey) return

    setNavigationHistory((prev) => {
      const { forward, backward, current } = prev

      setSelectedContentItem('')
      setSelectedDirectoryKey(homeDirectoryKey)
      setOpenDirs([homeDirectoryKey])

      return {
        backward: [...backward, current],
        current: homeDirectoryKey,
        forward
      }
    })
  }

  const handleSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault()
    InputRef.current?.blur()
    try {
      const data = await window.api.getUserDirectoryAndFiles(inputValue)
      setCurrentDirData(data)
    } catch (e) {
      alert('Please enter a valid path')
    }
  }

  useEffect(() => {
    const handleShortcuts = (event: KeyboardEvent): void => {
      // backward
      if (event.ctrlKey && event.key === '[') handleBackward()

      // forward
      if (event.ctrlKey && event.key === ']') handleForward()

      // input focus
      if (event.ctrlKey && (event.key === 'l' || event.key === 'L')) InputRef.current?.focus()
      if (event.key === 'Escape') InputRef.current?.blur()
    }

    window.addEventListener('keydown', handleShortcuts)
    return () => {
      window.removeEventListener('keydown', handleShortcuts)
    }
  }, [])

  useEffect(() => {
    setInputValue(currentDirData?.path)
  }, [currentDirData])

  return {
    inputValue,
    setInputValue,
    InputRef,
    handleBackward,
    handleForward,
    handleHome,
    handleSubmit,
    navigationHistory
  }
}
