export const HiddenLabel = (): React.ReactElement => {
  return (
    <div className="inset-x-0">
      <span className="text-xs w-full inline-flex justify-center items-center text-foreground-base/60">
        <span className="border border-foreground-muted/40 font-bold rounded inline-flex justify-center items-center size-4">
          H
        </span>
        <span className="pl-1"> to toggle hidden files </span>
      </span>
    </div>
  )
}
