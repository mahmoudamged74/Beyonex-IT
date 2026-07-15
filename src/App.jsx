import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import ContactUs from './Pages/ContactUs/ContactUs'
import Services from './Pages/Services/Services'
import ScrollToTop from './Components/Layout/ScrollToTop/ScrollToTop'
import AppLoader from './Components/Layout/AppLoader/AppLoader'

const ServiceDetails = lazy(() => import('./Pages/ServiceDetails/ServiceDetails'))
const StartProject = lazy(() => import('./Pages/StartProject/StartProject'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:serviceKey" element={<ServiceDetails />} />
            <Route path="start-project" element={<StartProject />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
