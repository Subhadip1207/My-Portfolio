import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './pages/subComponents/Footer'
import Home from './pages/Home'
import ProjectView from './pages/ProjectView'
import { ModeToggle } from './components/mode-toggle'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'

function App() {

  // Force dark mode always
  useEffect(() => {
    document.documentElement.classList.add("dark")
    document.documentElement.classList.remove("light")
  }, [])

  return (
    <>
      <Router>

        {/* You can REMOVE ModeToggle if you don’t need theme switching */}
        {/* <ModeToggle /> */}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/project/:id' element={<ProjectView />} />
        </Routes>

        <Footer />

        <ToastContainer position='bottom-right' theme='dark' />

      </Router>
    </>
  )
}

export default App