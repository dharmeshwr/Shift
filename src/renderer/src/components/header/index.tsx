import { cn } from '@renderer/utils'
import { ComponentProps } from 'react'
import { BiHomeAlt as Home } from 'react-icons/bi'
import { IoChevronBack as Back, IoChevronForward as Next, IoAdd as Add } from 'react-icons/io5'
import { useHeader } from './use-header'

export const Header = ({ className, ...rest }: ComponentProps<'div'>): React.ReactElement => {
  const {
    InputRef,
    inputValue,
    setInputValue,
    handleBackward,
    handleForward,
    handleHome,
    handleSubmit,
    navigationHistory
  } = useHeader()

  return (
    <div className={cn('relative flex items-center justify-center', className)} {...rest}>
      <div className="bg-background border rounded-md border-foreground-base/30 w-1/3 min-w-96">
        <form onSubmit={handleSubmit}>
          <input
            ref={InputRef}
            type="text"
            className="px-3 w-full"
            value={inputValue || ''}
            spellCheck={false}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center absolute left-0 gap-2 px-4">
        <button
          className={cn(
            'cursor-pointer',
            navigationHistory.backward.length === 0 && 'text-foreground-base/30'
          )}
          onClick={handleBackward}
          disabled={navigationHistory.backward.length === 0}
        >
          <Back size={18} />
        </button>
        <button
          className={cn(
            'cursor-pointer',
            navigationHistory.forward.length === 0 && 'text-foreground-base/30'
          )}
          onClick={handleForward}
          disabled={navigationHistory.forward.length === 0}
        >
          <Next size={18} />
        </button>
        <button className="cursor-pointer" onClick={handleHome}>
          <Home size={18} />
        </button>
      </div>

      <div className="flex items-center absolute right-0 px-4  cursor-pointer">
        <span className='rounded-full size-4 hover:bg-background/40 transition-colors'>
          <Add size={18} />
        </span>
      </div>
    </div>
  )
}
