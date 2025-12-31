
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('radiant_auth');
    setIsLoggedIn(!!auth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('radiant_auth');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-300 sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <i className="fa-solid fa-microscope text-blue-700 text-2xl"></i>
              <span className="text-xl font-bold tracking-tight text-slate-900">Radiant<span className="text-blue-700">IQ</span></span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className="text-slate-700 hover:text-blue-700 px-3 py-2 text-sm font-semibold transition-colors">Home</Link>
              <Link to="/upload" className="text-slate-700 hover:text-blue-700 px-3 py-2 text-sm font-semibold transition-colors">New Analysis</Link>
              <Link to="/contact" className="text-slate-700 hover:text-blue-700 px-3 py-2 text-sm font-semibold transition-colors">Contact</Link>
            </div>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-600 hidden md:block">Dr. Arjun Mehta</span>
                <button 
                  onClick={handleLogout}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-sm font-bold border border-slate-300 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-700 hover:text-blue-700 px-4 py-2 text-sm font-bold transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="ml-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-bold shadow-md transition-all">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
