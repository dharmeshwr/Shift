import { Theme } from '@shared/types'
import { useLayoutEffect, useState } from 'react'

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

  useLayoutEffect(() => {
    const fetchConfig = async (): Promise<void> => {
      try {
        const config = await getUserConfiguration()
        if (config && config.theme) updateTheme(config.theme)
      } catch {
        updateTheme(Theme.Default)
      }
    }
    fetchConfig()
  }, [])

  return (
    <div className="absolute bottom-full right-0 border-t border-l rounded-tl border-foreground-base/30">
      <select className="bg-background-muted w-fit" value={theme} onChange={handleChange}>
        {Object.entries(Theme).map(([key, value], i) => (
          <option key={i} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  )
}
