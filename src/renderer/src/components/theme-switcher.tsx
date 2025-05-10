import { Theme } from '@shared/types'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = (): React.ReactElement => {
  const [theme, setTheme] = useState(Theme.Default)
  const { getUserConfiguration, updateUserConfiguration } = window.api

  const updateTheme = (themeValue: string): void => {
    if (Object.values(Theme).includes(themeValue as Theme)) {
      const validTheme = themeValue as Theme
      document.querySelector('body')?.setAttribute('data-theme', validTheme)
      setTheme(validTheme)
    } else {
      console.warn(`Invalid theme value: ${themeValue}. Falling back to Default.`)
      setTheme(Theme.Default)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    updateTheme(event.target.value)
    updateUserConfiguration({ theme: event.target.value })
  }

  useEffect(() => {
    ; (async () => {
      try {
        const data = await getUserConfiguration()
        updateTheme(data.theme)
      } catch {
        updateTheme(Theme.Default)
      }
    })()
  }, [])

  return (
    <div className="absolute bottom-full right-0 border-t border-l rounded-tl border-foreground-base/30">
      <select className="bg-background-muted w-fit" value={theme} onChange={handleChange}>
        <option value={Theme.Default}>Default</option>
        <option value={Theme.Gruvbox}>Gruvbox</option>
        <option value={Theme.Catppuccin}>Catppuccin</option>
        <option value={Theme.TokyoNight}>Tokyo Night</option>
        <option value={Theme.NightOwl}>Night Owl</option>
        <option value={Theme.OneDark}>One Dark</option>
        <option value={Theme.Nord}>Nord</option>
        <option value={Theme.Solarized}>Solarized</option>
      </select>
    </div>
  )
}
