import { IoChevronForward as Next, IoChevronBack as Back } from 'react-icons/io5'
import { FaHistory as History } from 'react-icons/fa'
import { BiHomeAlt as Home } from 'react-icons/bi'
import { ComponentProps } from 'react'
import { cn } from '@renderer/utils'

export const Header = ({ className, ...rest }: ComponentProps<'div'>): React.ReactElement => {
  return (
    <div className={cn('relative flex items-center justify-center', className)} {...rest}>
      <span className="bg-background border rounded-md border-foreground-base/30 w-1/3 min-w-96">
        <input
          type="text"
          className="px-3 w-full"
          value="/home/ninjafire"
          spellCheck={false}
          onChange={() => { }}
        />
      </span>

      <div className="flex items-center absolute left-0 gap-2 px-4">
        <button className="cursor-pointer">
          <Back size={18} />
        </button>
        <button className="cursor-pointer">
          <Next size={18} />
        </button>
        <button className="cursor-pointer">
          <Home size={18} />
        </button>
      </div>

      <div className="flex items-center absolute right-0 gap-2 px-4">
        <button className="cursor-pointer">
          <History size={16} />
        </button>
      </div>
    </div>
  )
}
