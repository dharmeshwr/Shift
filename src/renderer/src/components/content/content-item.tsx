import { cn } from '@renderer/utils'

type ContentItemProps = {
  icon: React.ElementType
  label: string
  isSelected: boolean
  onClick: () => void
  onDoubleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ContentItem = ({
  icon: Icon,
  label,
  isSelected,
  onClick,
  onDoubleClick
}: ContentItemProps): React.ReactElement => (
  <button
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    className={cn(
      'rounded-md size-28 hover:bg-background-muted text-foreground-base border-3 border-background cursor-pointer transition-colors',
      isSelected && 'bg-highlight/40 duration-100 border-highlight hover:bg-highlight/50',
      'flex flex-col justify-center p-2 relative'
    )}
  >
    <Icon className="size-1/2 flex-1 self-center" />
    <span className={cn('truncate', 'overflow-auto break-words')}>{label}</span>
  </button>
)
