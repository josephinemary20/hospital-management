import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//import './index.css'
//import App from './App.jsx'
import Nestedrouter from './nestedrouter/index'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nestedrouter />
  </StrictMode>,
)
