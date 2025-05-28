import { NavigationHistory } from '../../shared/types'

global.navigationHistory = {
  backward: [],
  forward: [],
  current: ''
} as NavigationHistory

export const getCurrent = (): string => {
  return global.navigationHistory.current
}

export const getSavedNavigationHistory = (): NavigationHistory => {
  return global.navigationHistory
}

export const saveNavigationHistory = (data: NavigationHistory): void => {
  global.navigationHistory = data
}
