import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<Home />} />
          <Route path='/intruments' element={}/>
          <Route path='/teachers' element={}/>
          <Route path='/bulletin' element={}/>
          <Route path='/contact' element={}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
