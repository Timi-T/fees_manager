import React from 'react'
import Header from './header/Header'
import PageLayout from './pageLayout/pageLayout'
import '../styles/global.css'
import DisplayMessage from './displayMessage/displayMessage'

function App() {
  return (
    <div>
      <Header />
      <DisplayMessage message="You have succesfully logged in"/>
      <PageLayout />
    </div>
  )
}

export default App