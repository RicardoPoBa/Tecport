import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { QuoteCartProvider } from './context/QuoteCartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QuoteCartProvider>
        <App />
      </QuoteCartProvider>
    </BrowserRouter>
  </StrictMode>,
)
