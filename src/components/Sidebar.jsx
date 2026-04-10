import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Sidebar({ role = 'admin' }) {
  const { currentVendor } = useApp()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  if (role !== 'admin' && !currentVendor) return null

  const isActive = (path) => location.pathname === path

  const links =
    role === 'admin'
      ? [
          { name: 'Dashboard', path: '/admin' },
          { name: 'Onboarding', path: '/admin/onboarding' },
          { name: 'Vendors', path: '/admin/vendors' },
          { name: 'Products', path: '/admin/products' },
          { name: 'Orders', path: '/admin/pos' },
          { name: 'Invoices', path: '/admin/invoices' },
          { name: 'Shipments', path: '/admin/shipments' },
        ]
      : [
          { name: 'Dashboard', path: '/vendor' },
          { name: 'Products', path: '/vendor/products' },
          { name: 'My Orders', path: '/vendor/pos' },
          { name: 'Invoices', path: '/vendor/invoice' },
          { name: 'Shipments', path: '/vendor/shipments' },
        ]

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow sticky top-0 z-40">
        <h1 className="text-lg font-bold text-blue-600">
          {role === 'admin' ? 'Admin Panel' : 'Vendor Panel'}
        </h1>
        <button onClick={() => setOpen(true)} className="text-2xl">☰</button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full w-64 
        bg-white border-r shadow-lg p-5 flex flex-col
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600">
            VendorPro
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {role === 'admin' ? 'Admin Panel' : currentVendor?.company}
          </p>
        </div>

        {/* Links */}
        <nav className="flex-1 space-y-2">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-6">
          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <p className="text-gray-500">Logged in</p>
            <p className="font-medium truncate">
              {role === 'admin' ? 'Admin User' : currentVendor?.company}
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}