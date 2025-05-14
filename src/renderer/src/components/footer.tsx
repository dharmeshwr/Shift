import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'
import { ThemeSwitcher } from './theme-switcher'
import { HiddenLabel } from './ui/hidden-label'

export const Footer = ({ className, ...rest }: ComponentProps<'div'>): React.ReactElement => {
  return (
    <div
      className={cn('absolute bottom-0 w-full flex items-center justify-center', className)}
      {...rest}
    >
      <div className="flex justify-between w-full">
        <div>
          <span>6 items </span>
          <span>(40 hidden)</span>
        </div>

        <HiddenLabel />

        <div>
          <span>Free space: 115.7 GiB </span>
          <span>(Total: 170.0 GiB)</span>
        </div>
      </div>

      <ThemeSwitcher />
    </div>
  )
}
