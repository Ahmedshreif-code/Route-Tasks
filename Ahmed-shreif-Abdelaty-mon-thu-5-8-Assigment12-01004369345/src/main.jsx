import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  '@fortawesome/fontawesome-free/css/all.css'
import "@fortawesome/fontawesome-free/js/all.js";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
