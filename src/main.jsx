import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import './App.css'
import Main from './components/UI/templates/main'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {
      <Main/>
    }
  </React.StrictMode>,
)
