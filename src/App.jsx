import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import ContactUs from './Pages/ContactUs/ContactUs'
import Services from './Pages/Services/Services'
import Privacy from './Pages/Privacy/Privacy'
import ScrollToTop from './Components/Layout/ScrollToTop/ScrollToTop'
import { ThemeProvider } from './context/ThemeContext'

const ServiceDetails = lazy(() => import('./Pages/ServiceDetails/ServiceDetails'))
const StartProject = lazy(() => import('./Pages/StartProject/StartProject'))

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:serviceKey" element={<ServiceDetails />} />
          <Route path="start-project" element={<StartProject />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
