import 'leaflet/dist/leaflet.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import Aos from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './contexts/AuthProvider.jsx'


Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
