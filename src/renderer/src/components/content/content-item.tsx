import { cn, truncate } from '@renderer/utils'

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
    data-item
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    className={cn(
      'rounded-md hover:bg-background-muted text-foreground-base w-32 px-2 py-3 self-start border-3 border-background cursor-pointer transition-colors',
      isSelected && 'bg-highlight/40 duration-100 border-highlight hover:bg-highlight/50'
    )}
  >
    <Icon className="flex w-full" size={60} />
    <span className="break-words">{truncate(label)}</span>
  </button>
)
