import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './components/UI/templates/main'
import LandingPage from './components/UI/templates/landingPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {
        <LandingPage/>
    }
  </React.StrictMode>,
)
