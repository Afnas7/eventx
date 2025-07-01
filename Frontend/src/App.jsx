import React from 'react'
import Home from './home/Home'
import Events from './event/Events';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Contact from './components/Contact';
import EventDetails from './components/EventDetails';
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar'; // ← make sure you have Navbar imported
import "./index.css";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar /> {/* ← This needs to be shown across all pages */}
      <main className="pt-20 px-4 bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen transition-all duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/event-details/:eventId" element={<EventDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
