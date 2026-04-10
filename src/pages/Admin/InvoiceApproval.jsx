import React from 'react'
import { useApp } from '../../context/AppContext'

export default function InvoiceApproval() {
  const { data, updateInvoice, addPayment } = useApp()

  function approve(inv) {
    updateInvoice(inv.id, { status: 'Approved' })
    addPayment({
      invoiceId: inv.id,
      vendorId: inv.vendorId,
      amount: inv.amount,
      status: 'Pending',
      dueDate: inv.dueDate,
    })
  }

  function reject(inv) {
    const reason = prompt('Rejection reason')
    if (reason) updateInvoice(inv.id, { status: 'Rejected', reason })
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-600'
      case 'Rejected':
        return 'bg-red-100 text-red-600'
      case 'Submitted':
        return 'bg-yellow-100 text-yellow-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="p-4 md:p-6 w-full">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Invoice Approval
        </h2>
        <p className="text-sm text-gray-500">
          Manage and approve vendor invoices
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">
            
            {/* Head */}
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Invoice#</th>
                <th className="px-4 py-3 text-left">Vendor</th>
                <th className="px-4 py-3 text-left">PO</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.invoices.map((i) => {
                const vendor = data.vendors.find(v => v.id === i.vendorId)

                return (
                  <tr
                    key={i.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {i.invoiceNumber || i.id}
                    </td>

                    <td className="px-4 py-3">
                      {vendor?.company || '—'}
                    </td>

                    <td className="px-4 py-3">{i.poId}</td>

                    <td className="px-4 py-3 font-semibold text-gray-700">
                      ₹{i.amount}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                          i.status
                        )}`}
                      >
                        {i.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {i.status === 'Submitted' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approve(i)}
                            className="px-3 py-1 text-xs rounded-md bg-green-500 text-white hover:bg-green-600"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => reject(i)}
                            className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          No action
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}