import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/router/app-router.tsx'
import "./index.css"
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

