import { cn } from '@renderer/utils'
import { FaAngleDown } from 'react-icons/fa6'
import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

type SelectContextType = {
  isOpen: boolean
  toggle: () => void
  select: (value: string) => void
  selectedValue: string | null
  setIsOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextType | null>(null)

const useSelect = (): SelectContextType => {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error('Select components must be with in <Select>')
  return ctx
}

const Select = ({
  children,
  selectedValue,
  onChange,
  ...rest
}: {
  children: ReactNode
  selectedValue: string
  onChange: (value: string) => void
} & ComponentProps<'div'>): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const toggle = (): void => setIsOpen((prev) => !prev)
  const select = (value: string): void => {
    setIsOpen(false)
    onChange(value)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, toggle, select, selectedValue }}>
      <div
        ref={selectRef}
        className="relative cursor-pointer whitespace-nowrap select-none shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        {...rest}
      >
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = ({
  placeholder,
  ...rest
}: { placeholder?: string } & ComponentProps<'button'>): React.ReactElement => {
  const { isOpen, toggle, selectedValue } = useSelect()
  return (
    <button
      onClick={toggle}
      className="flex justify-between items-center py-1 px-2 border border-foreground-muted/30 rounded-md bg-background w-full"
      {...rest}
    >
      {selectedValue || placeholder || 'Select an option'}
      <FaAngleDown
        className={cn(isOpen ? 'rotate-180' : 'rotate-0', 'transition-all ease-in-out')}
        size={13}
      />
    </button>
  )
}

const SelectContent = ({
  children,
  ...rest
}: PropsWithChildren & ComponentProps<'div'>): React.ReactElement | null => {
  const { isOpen } = useSelect()
  return (
    <div
      className={cn(
        'bg-background w-full py-1 px-1 rounded-md transition-all duration-200 border border-foreground-muted/30',
        isOpen
          ? 'opacity-100 translate-y-1 pointer-events-auto'
          : 'opacity-0 -translate-y-1 pointer-events-none',
        'z-50 shadow-md absolute top-full overflow-x-hidden'
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

const SelectItem = ({
  value,
  children,
  ...rest
}: {
  value: string
  children: ReactNode
} & ComponentProps<'div'>): React.ReactElement => {
  const { select } = useSelect()

  return (
    <div
      onClick={() => select(value)}
      className="px-1 py-1 rounded hover:bg-background-muted"
      {...rest}
    >
      {children}
    </div>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger }
