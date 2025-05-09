export const Footer = (): React.ReactElement => {
  return (
    <div className="relative flex items-center justify-center px-4 bg-background-muted text-foreground-base border-t border-t-foreground-base/30">
      <div className="flex justify-between w-full">
        <div>
          <span>7 items </span>
          <span>(40 hidden)</span>
        </div>

        <div>
          <span>Free space: 115.7 GiB </span>
          <span>(Total: 170.0 GiB)</span>
        </div>
      </div>
    </div>
  )
}
