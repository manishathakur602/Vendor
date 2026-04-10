import React from 'react'
import { useApp } from '../../context/AppContext'

export default function VendorPOs() {
  const { data, updatePO, currentVendor } = useApp()

  if (!currentVendor) {
    return (
      <div className="p-4">
        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <h3 className="text-lg font-semibold">
            Please sign in to view your POs
          </h3>
        </div>
      </div>
    )
  }

  const myPOs = data.pos.filter(
    (p) => p.vendorId === currentVendor.id
  )

  function accept(id) {
    updatePO(id, { status: 'Accepted' })
  }

  function reject(id) {
    const r = prompt('Reason')
    if (r) updatePO(id, { status: 'Rejected', reason: r })
  }

  function getStatusStyle(status) {
    if (status === 'Accepted')
      return 'bg-green-100 text-green-700'
    if (status === 'Rejected')
      return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Purchase Orders
      </h2>

      <div className="bg-white p-5 rounded-xl shadow border">

        {/* ✅ Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">PO#</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {myPOs.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {p.poNumber}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ₹
                    {(p.lineItems || []).reduce(
                      (s, li) => s + li.qty * li.rate,
                      0
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${getStatusStyle(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {p.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => accept(p.id)}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => reject(p.id)}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {myPOs.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400"
                  >
                    No purchase orders found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* ✅ Mobile Cards */}
        <div className="md:hidden space-y-4">
          {myPOs.map((p) => {
            const amount = (p.lineItems || []).reduce(
              (s, li) => s + li.qty * li.rate,
              0
            )

            return (
              <div
                key={p.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">
                    {p.poNumber}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getStatusStyle(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  Amount: <span className="font-semibold">₹{amount}</span>
                </p>

                {p.status === 'Pending' && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => accept(p.id)}
                      className="flex-1 bg-green-500 text-white py-2 rounded text-sm"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => reject(p.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          {myPOs.length === 0 && (
            <p className="text-center text-gray-400">
              No purchase orders found
            </p>
          )}
        </div>

      </div>
    </div>
  )
}