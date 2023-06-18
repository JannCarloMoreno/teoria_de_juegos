import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './components/UI/templates/main'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {
      <Main/>
    }
  </React.StrictMode>,
)
