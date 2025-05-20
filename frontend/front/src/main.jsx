import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//import './index.css'
//import App from './App.jsx'
import Nestedrouter from './nestedrouter/index'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Nestedrouter />
    </HashRouter>
  </StrictMode>,
)
