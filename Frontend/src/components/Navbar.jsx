import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Navbar() {
  const [theme, setTheme] = useState('light');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleEventsClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error('Please login first');
      localStorage.setItem('redirectAfterLogin', '/Events');
      document.getElementById('my_modal_3').showModal();
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('Users');
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md text-black dark:text-white">
      <div className="navbar max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">EventX</Link>

        <ul className="flex gap-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Events" onClick={handleEventsClick}>Events</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme}>
            <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
          </button>

          {user ? (
            <>
              <span className="text-sm font-medium">{user.fullname}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
            >
            Login
            </button>

          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
