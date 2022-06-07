import React from 'react'
import Header from './header/Header'
import PageLayout from './pageLayout/pageLayout'
import '../styles/global.css'
import SidePane from './sidePane/sidePane'

function App() {
  return (
    <div>
      <Header />
      <PageLayout />
    </div>
  )
}

export default App