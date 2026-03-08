import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount and update on change
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Listen for storage changes (works if another tab logs out)
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear all auth-related items
    localStorage.removeItem("token");
    localStorage.clear(); // This removes all items in localStorage
  
    // Force re-evaluating the login state
    setIsLoggedIn(false);
  
    // Navigate and force a re-render
    navigate("/");
    window.location.reload();
  };
  

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
      className='w-[45%] px-4 h-12 relative bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs left-[27.5%] transform -translate-x-1/2 flex justify-between items-center rounded-t-sm rounded-b-lg'
    >
      <h1 className='text-2xl text-white font-bold'>Career Guidance</h1>
      <div className='flex gap-7 items-center text-md text-white font-semibold'>
        <Link className='text-md text-white' to="/">Home</Link>
        {!isLoggedIn ? (
          <Link className='text-md text-white' to="/login">Login</Link>
        ) : (
          <button className='text-md text-white' onClick={handleLogout}>Logout</button>
        )}
        <Link className='text-md text-white' to="/form">Forms</Link>
        <Link className='text-md text-white' to="/results">Results</Link>
        {/* <Link className='text-md text-white' to="/developers">Developers</Link> */}
      </div>
    </motion.nav>
  );
}

export default Navbar;
