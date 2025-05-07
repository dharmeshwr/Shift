import { CiServer } from 'react-icons/ci'

export const PingButton = (): React.ReactElement | null => {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <button
      className="
        absolute
        bottom-1
        left-1
        cursor-pointer
        hover:text-foreground-base/50
        hover:border-foreground-muted/50
        text-foreground-base
        border-3 border-foreground-muted
        rounded-full
        p-1
      "
      onClick={() => window.api.ping('hello')}
    >
      <CiServer size={25} />
    </button>
  )
}
