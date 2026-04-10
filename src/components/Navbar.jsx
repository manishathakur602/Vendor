import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { currentVendor, logoutVendor } = useApp()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ">
          VendorPro
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition font-medium">
            Admin
          </Link>
          <Link to="/vendor" className="text-gray-600 hover:text-blue-600 transition font-medium">
            Vendor
          </Link>

          {!currentVendor ? (
            <Link
              to="/vendor/login"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:shadow-lg hover:scale-105 transition"
            >
              Sign In
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full font-medium">
                {currentVendor.company}
              </span>
              <button
                onClick={logoutVendor}
                className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`w-6 h-0.5 bg-gray-800 transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 space-y-3 bg-white/80 backdrop-blur-md border-t">

          <Link to="/admin" onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
            Admin
          </Link>

          <Link to="/vendor" onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
            Vendor
          </Link>

          {!currentVendor ? (
            <Link
              to="/vendor/login"
              onClick={() => setIsOpen(false)}
              className="block text-center py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
            >
              Sign In
            </Link>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                {currentVendor.company}
              </div>
              <button
                onClick={() => {
                  logoutVendor()
                  setIsOpen(false)
                }}
                className="w-full py-2 bg-gray-100 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  )
}