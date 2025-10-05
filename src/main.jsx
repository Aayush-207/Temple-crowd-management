import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './home.jsx'
import Bookings from './bookings.jsx'
import Auth from './auth.jsx'
import Admin from './admin.jsx'

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/')

  useEffect(() => {
    const handler = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (route === '#/bookings') {
    return <Bookings />
  }
  if (route === '#/auth') {
    return <Auth />
  }
  if (route === '#/admin') {
    return <Admin />
  }
  return <Home />
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element with id "root" not found')
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


