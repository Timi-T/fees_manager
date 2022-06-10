import React from 'react'
import Header from './header/Header'
import PageLayout from './pageLayout/pageLayout'
import '../styles/global.css'
import DisplayMessage from './displayMessage/displayMessage'

function App() {
  return (
    <div>
      <Header />
      <DisplayMessage message="Welcome Opeyemi!. Select a school to get started."/>
      <PageLayout />
    </div>
  )
}

export default App