import { Content, RootLayout, Sidebar } from './components/app-layout'
import { PingButton } from './components/ping-button'
import { ThemeSwitcher } from './components/theme-switcher'

const App = (): React.ReactElement => {
  return (
    <RootLayout>
      <Sidebar className="bg-background/95 text-foreground-base"> Sidebar </Sidebar>
      <Content className="bg-background text-foreground-base relative">
        Content
        <ThemeSwitcher />
      </Content>
      <PingButton message={'hello world'} />
    </RootLayout>
  )
}

export default App
