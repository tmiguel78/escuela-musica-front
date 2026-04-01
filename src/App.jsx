import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Instruments from './pages/Instruments';
import Teachers from './pages/Teachers';
import Bulletin from './pages/Bulletin';
import Contact from './pages/Contact';
import Login from './pages/Login';
import LoginButton from './components/LoginButton';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <LoginButton />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/instruments' element={<Instruments />}/>
          <Route path='/teachers' element={<Teachers />}/>
          <Route path='/bulletin' element={<Bulletin />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
