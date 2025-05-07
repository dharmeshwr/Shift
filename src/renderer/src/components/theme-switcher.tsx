import { THEME } from '@shared/constants'

export const ThemeSwitcher = (): React.ReactElement => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const body = document.querySelector('body')
    body?.setAttribute('data-theme', event.target.value)
  }

  return (
    <div className="absolute bottom-0 right-0">
      <select className="w-fit" onChange={handleChange}>
        <option value={THEME.Default}>Default</option>
        <option value={THEME.Gruvbox}>Gruvbox</option>
        <option value={THEME.Dracula}>Dracula</option>
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
