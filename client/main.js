import React from 'react'
import App from './App'
import {createRoot} from 'react-dom/client'
import { hydrateRoot } from 'react-dom/client'
const container=document.getElementById('root')
// const root=createRoot(container)
// root.render(<App/>)
hydrateRoot(container,<App/>)