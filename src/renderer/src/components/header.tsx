import { IoChevronForward as Next, IoChevronBack as Back } from 'react-icons/io5'
import { FaHistory as History } from 'react-icons/fa'
import { BiHomeAlt as Home } from 'react-icons/bi'

export const Header = (): React.ReactElement => {
  return (
    <div className="relative flex  items-center justify-center bg-background-muted text-foreground-base border-b border-b-foreground-base/30 py-1">

      <span className="bg-background border rounded-md border-foreground-base/30 w-1/3 min-w-96">
        <input type="text" className="px-3" value="/home/ninjafire" />
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
