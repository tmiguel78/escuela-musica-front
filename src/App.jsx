import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginButton from './components/LoginButton';
import Home from './pages/Home';
import Instruments from './pages/Instruments';
import Teachers from './pages/Teachers';
import Bulletin from './pages/Bulletin';
import Contact from './pages/Contact';
import Login from './pages/Login';
import FormNewBulletin from './components/FormNewBulletin';
import FormNewInstrument from './components/FormNewInstrument';
import FormNewTeacher from './components/FormNewTeacher';

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
          <Route path='/new-bulletin' element={<FormNewBulletin />}/>
          <Route path='/new-instrument' element={<FormNewInstrument />}/>
          <Route path='/new-teacher' element={<FormNewTeacher />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
