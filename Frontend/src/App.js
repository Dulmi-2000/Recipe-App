import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './Layout/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Favourite from './Pages/Favourite/Favourite'
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';
import Recepi from './Pages/Recepi/recepi';

function App() {
  return (
    <div className="App">
      <Router> 
        <RouterContent />
      </Router>
    </div>
  );
}

function RouterContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/Signin/Signin' || location.pathname === '/Signup/Signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Favourite/Favourite' element={<Favourite />} />
        <Route path='/Signin/Signin' element={<Signin />} />
        <Route path='/Signup/Signup' element={<Signup />} />
        <Route path='/Recepi/Recepi:id' element={<Recepi />} />
      </Routes>
    </>
  );
}

export default App;
