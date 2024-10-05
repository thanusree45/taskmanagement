import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard.js'; // Import AdminDashboard component
import '../App.css';
function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/admin-login', { username, password });
      setLoggedIn(true);
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }} >Admin Login</h2>
      {!loggedIn ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <AdminDashboard /> // Render AdminDashboard component on successful login
      )}
    </div>
  );
}

export default AdminLogin;
