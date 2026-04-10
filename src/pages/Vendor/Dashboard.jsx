import React from 'react'
import { useApp } from '../../context/AppContext'

export default function VendorDashboard() {
  const { data, currentVendor } = useApp()

  if (!currentVendor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white p-6 rounded-xl shadow border text-center max-w-sm w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Please sign in
          </h3>
          <p className="text-gray-500 text-sm">
            You must be signed in as a vendor to view the dashboard.
          </p>
        </div>
      </div>
    )
  }

  const myPOs = data.pos.filter(p => p.vendorId === currentVendor.id)
  const myInvoices = data.invoices.filter(i => i.vendorId === currentVendor.id)
  const myShipments = data.shipments.filter(s => s.vendorId === currentVendor.id)

  const cards = [
    { title: 'Total POs', value: myPOs.length },
    {
      title: 'Pending Invoices',
      value: myInvoices.filter(i => i.status !== 'Approved').length,
    },
    { title: 'Shipments In Transit', value: myShipments.length },
  ]

  return (
    <div className="p-4 md:p-6 w-full">

      {/* Header */}
      {/* <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Vendor Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome, {currentVendor.company} 👋
        </p>
      </div> */}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Recent Activity
        </h3>
        <p className="text-gray-600 text-sm">
          No real-time feed available. Check Purchase Orders and Invoices pages.
        </p>
      </div>
    </div>
  )
}