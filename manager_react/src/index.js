import React from 'react'
import App from './components/App'
import { createRoot } from 'react-dom/client'

const rootContent = document.getElementById("root")
const root = createRoot(rootContent)

root.render(<App />)

