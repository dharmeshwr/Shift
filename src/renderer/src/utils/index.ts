import { twMerge } from 'tailwind-merge'
import { ClassValue, clsx } from 'clsx'

export const cn = (...classes: ClassValue[]): string => twMerge(clsx(...classes))

export const isHiddenItem = (item: string): boolean => item.startsWith('.')

export const truncate = (string: string): string => {
  return string.length > 30
    ? string.slice(0, 20) + '...' + string.slice(string.length - 7, string.length)
    : string
}
