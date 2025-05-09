import { ContentLayout, RootLayout, SidebarLayout } from './components/app-layout'
import { PingButton } from './components/ping-button'
import { Sidebar } from './components/sidebar'
import { ThemeSwitcher } from './components/theme-switcher'

const App = (): React.ReactElement => {
  return (
    <RootLayout>
      <SidebarLayout className="bg-background/95 text-foreground-base relative">
        <Sidebar />
        <ThemeSwitcher />
      </SidebarLayout>
      <ContentLayout className="bg-background text-foreground-base ">Content</ContentLayout>
      <PingButton message={'hello world'} />
    </RootLayout>
  )
}

export default App
