import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!
rootEl.innerHTML = '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#888;font-size:14px;font-family:sans-serif">Lädt…</div>'

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
