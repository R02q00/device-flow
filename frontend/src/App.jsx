import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './Authentification/signin';
import Signup from './Authentification/signup';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';
import Device from './pages/device';
import About from './pages/About';
import Loan from './pages/loan';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Layout />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/device' element={<Device />}></Route>
        <Route path='/loan' element={<Loan />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
