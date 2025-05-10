import { placesMock } from '@renderer/store/mocks'
import { ComponentProps } from 'react'

export const Places = (props: ComponentProps<'div'>): React.ReactElement => {
  return (
    <div {...props}>
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
