import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-800 p-4 text-center text-gray-400">
      <p>© {new Date().getFullYear()} BetterBaruch (2B) - Creating a better experience for Baruch students</p>
    </footer>
  )
}

export default Footer;