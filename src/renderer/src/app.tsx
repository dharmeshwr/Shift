import { Content, RootLayout, Sidebar } from './components/app-layout'

const App = (): React.ReactElement => {
  return (
    <RootLayout>
      <Sidebar className="bg-zinc-800 text-white"> Sidebar </Sidebar>
      <Content className="bg-zinc-900 border-l border-l-zinc-500/50 text-white"> Content </Content>
    </RootLayout>
  )
}

export default App
