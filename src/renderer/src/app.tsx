import { ContentLayout, RootLayout, SidebarLayout } from './components/app-layout'
import { Content } from './components/content'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'

const App = (): React.ReactElement => {
  return (
    <RootLayout>
      <Header className="py-1 bg-background-muted text-foreground-base border-b border-b-foreground-base/30" />

      {/* Main area */}
      <div className="flex h-full relative">
        <SidebarLayout className="bg-background/95 text-foreground-base relative">
          <Sidebar />
        </SidebarLayout>
        <ContentLayout className="bg-background text-foreground-base relative">
          <Content />
        </ContentLayout>
      </div>

      <Footer className="px-4 bg-background-muted text-foreground-base border-t border-t-foreground-base/30" />
    </RootLayout>
  )
}

export default App
