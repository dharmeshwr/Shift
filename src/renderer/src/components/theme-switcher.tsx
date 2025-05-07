import { THEME } from '@shared/constants'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = (): React.ReactElement => {
  const [theme, setTheme] = useState(THEME.Default)
  const { getUserConfiguration, updateUserConfiguration } = window.api

  const updateTheme = (themeValue: string): void => {
    if (Object.values(THEME).includes(themeValue as THEME)) {
      const validTheme = themeValue as THEME
      document.querySelector('body')?.setAttribute('data-theme', validTheme)
      setTheme(validTheme)
    } else {
      console.warn(`Invalid theme value: ${themeValue}. Falling back to Default.`)
      setTheme(THEME.Default)
    }
  };

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
        updateTheme(THEME.Default)
      }
    })()
  }, [])

  return (
    <div className="absolute bottom-0 right-0">
      <select className="bg-background-muted w-fit" value={theme} onChange={handleChange}>
        <option value={THEME.Default}>Default</option>
        <option value={THEME.Gruvbox}>Gruvbox</option>
        <option value={THEME.Catppuccin}>Catppuccin</option>
        <option value={THEME.TokyoNight}>Tokyo Night</option>
        <option value={THEME.NightOwl}>Night Owl</option>
        <option value={THEME.OneDark}>One Dark</option>
        <option value={THEME.Nord}>Nord</option>
        <option value={THEME.Solarized}>Solarized</option>
      </select>
    </div>
  )
}
