import './assets/main.css'
import { DevTools } from 'jotai-devtools'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <DevTools theme="dark" position="top-right" isInitialOpen />
  </StrictMode>
)
