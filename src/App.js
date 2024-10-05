import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Register from './components/register';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import './App.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav>
      {location.pathname !== '/register' && location.pathname !== '/admin-login' && location.pathname !== '/user-login' && (
        <>
          <Link to="/register" className="button">Register</Link>
          <br />
          <Link to="/admin-login" className="button">Admin Login</Link>
          <br />
          <Link to="/user-login" className="button">User Login</Link>
        </>
      )}
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className='main-container'>
        <h1>ADMIN / EMPLOYEE DASHBOARD</h1>
        <Navigation />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
