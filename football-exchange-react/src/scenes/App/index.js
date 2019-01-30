import React from 'react'
import { BrowserRouter } from 'react-router-dom'

// import Header from '../../layouts/Private/Header'
import Routes from './routes'

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        {/* <Header /> */}
        <Routes />
      </div>
    </BrowserRouter>
  </div>
)

export default App
