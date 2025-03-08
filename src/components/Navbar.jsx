import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.jpg';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setMenuHeight(mobileMenuRef.current.scrollHeight);
    } else {
      setMenuHeight(0);
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-slate-800 p-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">BetterBaruch</span>
          <div className="relative h-8 w-8 overflow-hidden bg-slate-800">
            <img
              src={logo}
              alt="BetterBaruch logo"
              className="h-full w-full object-contain mix-blend-multiply invert brightness-200 contrast-100"
            />
          </div>
        </div>

        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => setActiveTab('home')}
            className={`${activeTab === 'home' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-300 transition-colors`}
          >
            HOME
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className={`${activeTab === 'tools' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-300 transition-colors`}
          >
            TOOLS
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`${activeTab === 'about' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-300 transition-colors`}
          >
            ABOUT
          </button>
        </div>

        <div className="md:hidden">
          <button
            className="text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${menuHeight}px`, opacity: menuHeight > 0 ? 1 : 0 }}
      >
        <div className="mt-2 py-2 bg-slate-700 rounded-md shadow-lg">
          <div className="flex flex-col space-y-2 px-4">
            <button
              onClick={() => handleNavClick('home')}
              className={`${activeTab === 'home' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-300 transition-colors py-2 text-left`}
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick('tools')}
              className={`${activeTab === 'tools' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-300 transition-colors py-2 text-left`}
            >
              TOOLS
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`${activeTab === 'about' ? 'text-blue-400' : 'text-gray-300'} hover:text-blue-300 transition-colors py-2 text-left`}
            >
              ABOUT
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;