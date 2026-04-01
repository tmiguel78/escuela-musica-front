import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Instruments from './pages/Instruments';
import Teachers from './pages/Teachers';
import Bulletin from './pages/Bulletin';
import Contact from './pages/Contact';
import Login from './pages/Login';

import LoginButton from './components/LoginButton';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import FormNewBulletin from './components/FormNewBulletin';
import FormNewInstrument from './components/FormNewInstrument';
import FormNewTeacher from './components/FormNewTeacher';
import FormEditBulletin from './components/FormEditBulletin';
import FormEditInstrument from './components/FormEditInstrument';
import FormEditTeacher from './components/FormEditTeacher';

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
          <Route path='/new-bulletin' 
                 element={
                 <ProtectedRoute>
                  <FormNewBulletin />
                 </ProtectedRoute>
                 }/>
          <Route path='/new-instrument' 
                 element={
                 <ProtectedRoute>
                   <FormNewInstrument />
                 </ProtectedRoute>
                 }/>
          <Route path='/new-teacher' 
                 element={
                 <ProtectedRoute>
                  <FormNewTeacher />
                 </ProtectedRoute>
                 }/>
          <Route path='/bulletin/:bulletinId' 
                 element={
                 <ProtectedRoute>
                  <FormEditBulletin />
                 </ProtectedRoute>
                 }/>
          <Route path='/instrument/:instrumentId' 
                 element={
                 <ProtectedRoute>
                  <FormEditInstrument />
                 </ProtectedRoute>
                 }/>
          <Route path='/teacher/:teacherId' 
                 element={
                 <ProtectedRoute>
                  <FormEditTeacher />
                 </ProtectedRoute>
                 }/>       
        </Routes>
      </Router>
    </>
  )
}

export default App
