import React from 'react';
import logo from '../assets/logo.jpg';

const Navbar = ({ activeTab, setActiveTab }) => {
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
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;