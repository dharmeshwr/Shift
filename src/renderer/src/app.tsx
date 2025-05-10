import { ContentLayout, RootLayout, SidebarLayout } from './components/app-layout'
import { Content } from './components/content'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'
import { ThemeSwitcher } from './components/theme-switcher'

const App = (): React.ReactElement => {
  return (
    <RootLayout>
      <Header />

      {/* Main area */}
      <div className="flex h-full relative">
        <SidebarLayout className="bg-background/95 text-foreground-base relative">
          <Sidebar />
          <ThemeSwitcher />
        </SidebarLayout>
        <ContentLayout className="bg-background text-foreground-base ">
          <Content />
        </ContentLayout>
      </div>

      <Footer />
    </RootLayout>
  )
}

export default App
