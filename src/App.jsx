import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminOnboarding from './pages/Admin/VendorOnboarding'
import AdminVendors from './pages/Admin/VendorManagement'
import AdminProducts from './pages/Admin/ProductCatalog'
import AdminPOs from './pages/Admin/PurchaseOrders'
import AdminInvoices from './pages/Admin/InvoiceApproval'
import AdminShipments from './pages/Admin/Shipments'
import VendorSignup from './pages/Vendor/Signup'
import VendorDashboard from './pages/Vendor/Dashboard'
import VendorLogin from './pages/Vendor/Login'
import VendorPOs from './pages/Vendor/POs'
import VendorInvoice from './pages/Vendor/InvoiceSubmission'
import VendorShipments from './pages/Vendor/Shipments'
import VendorProducts from './pages/Vendor/Products'
import { useApp } from './context/AppContext'

export default function App(){
  const { data } = useApp()

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {/* <div className="max-w-7xl mx-auto w-full flex gap-6 py-8 px-4"> */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-6 py-4 md:py-8 px-4">
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/vendor/*" element={<VendorLayout />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  )

  function AdminLayout(){
    return (
      <>
        <Sidebar role="admin" />
        <main className="flex-1">
          <Routes>
            <Route path="" element={<AdminDashboard/>} />
            <Route path="onboarding" element={<AdminOnboarding/>} />
            <Route path="vendors" element={<AdminVendors/>} />
            <Route path="products" element={<AdminProducts/>} />
            <Route path="pos" element={<AdminPOs/>} />
            <Route path="invoices" element={<AdminInvoices/>} />
            <Route path="shipments" element={<AdminShipments/>} />
          </Routes>
        </main>
      </>
    )
  }

  function VendorLayout(){
    return (
      <>
        <Sidebar role="vendor" />
        <main className="flex-1">
          <Routes>
            <Route path="" element={<VendorDashboard/>} />
            <Route path="login" element={<VendorLogin/>} />
            <Route path="products" element={<VendorProducts/>} />
            <Route path="signup" element={<VendorSignup/>} />
            <Route path="pos" element={<VendorPOs/>} />
            <Route path="invoice" element={<VendorInvoice/>} />
            <Route path="shipments" element={<VendorShipments/>} />
          </Routes>
        </main>
      </>
    )
  }
}
