import React from 'react'
import ReactDOM from 'react-dom/client'
import Prompt from './components/molecules/prompt'
// import App from './App.jsx'
 import './index.css'
// import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */
      <Prompt buttonText='Generate Senate' inputPlaceholder='ingrese configuracion'/>
    }
  </React.StrictMode>,
)
