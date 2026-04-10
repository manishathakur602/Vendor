import React from 'react'
import { useApp } from '../../context/AppContext'

export default function AdminDashboard() {
  const { data } = useApp()

  const totalVendors = data.vendors.length
  const activePOs = data.pos.filter(
    p => p.status === 'Accepted' || p.status === 'Fulfilled'
  ).length
  const pendingInvoices = data.invoices.filter(
    i => i.status === 'Submitted' || i.status === 'Pending'
  ).length
  const paymentsReleased = data.payments.length

  const cards = [
    { title: 'Total Vendors', value: totalVendors },
    { title: 'Active POs', value: activePOs },
    { title: 'Pending Invoices', value: pendingInvoices },
    { title: 'Payments Released', value: paymentsReleased },
  ]

  return (
    <div className="p-4 md:p-6 w-full">
      
      {/* Header */}
      {/* <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h2>
        
      </div> */}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all border"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Section */}
      <div className="mt-6 bg-white p-5 rounded-xl shadow border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Vendor Onboarding Queue
        </h3>
        <p className="text-gray-600">
          Pending approvals:{' '}
          <span className="font-bold text-blue-600">
            {data.vendors.filter(v => v.status === 'Pending').length}
          </span>
        </p>
      </div>
    </div>
  )
}