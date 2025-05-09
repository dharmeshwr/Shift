import { placesMock } from '@renderer/store/mocks'

export const Places = (): React.ReactElement => {
  return (
    <div className="py-1.5">
      <ul className="pb-2">
        {placesMock.main.map((item, i) => (
          <li key={i} className="cursor-pointer px-2 py-1 hover:bg-background rounded-md">
            {item}
          </li>
        ))}
      </ul>
      <ul className="pt-2 border-t border-t-foreground-base/30">
        {placesMock.xdgs.map((item, i) => (
          <li key={i} className="cursor-pointer px-2 py-1 hover:bg-background rounded-md">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
