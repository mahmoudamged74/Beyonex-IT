import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import ContactUs from './Pages/ContactUs/ContactUs'
import ServiceDetails from './Pages/ServiceDetails/ServiceDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="services/:serviceKey" element={<ServiceDetails />} />
      </Route>
    </Routes>
  )
}

export default App
