import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function VendorOnboarding() {
  const { data, updateVendor } = useApp()
  const pending = data.vendors.filter(v => v.status === 'Pending')

  const [selected, setSelected] = useState(null)
  const [remark, setRemark] = useState('')

  function approve(id) {
    updateVendor(id, { status: 'Active' })
    setSelected(null)
  }

  function reject(id) {
    if (!remark) return alert('Provide remarks for rejection')
    updateVendor(id, { status: 'Rejected', remark })
    setSelected(null)
    setRemark('')
  }

  return (
    <div className="p-4 md:p-6 w-full">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Vendor Onboarding
        </h2>
        <p className="text-sm text-gray-500">
          Review and approve vendor registrations
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">

            {/* Head */}
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {pending.map(v => (
                <tr
                  key={v.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {v.company}
                  </td>

                  <td className="px-4 py-3">
                    {v.contact}
                  </td>

                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(v.createdAt).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(v)}
                      className="px-3 py-1 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {pending.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400"
                  >
                    No pending vendors
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Detail Card */}
      {selected && (
        <div className="bg-white rounded-xl shadow border p-5">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {selected.company}
              </h3>
              <p className="text-sm text-gray-500">
                {selected.contact} • {selected.email}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => approve(selected.id)}
                className="px-4 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Approve
              </button>

              <button
                onClick={() => reject(selected.id)}
                className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Reject
              </button>
            </div>

          </div>

          {/* Remark */}
          <div>
            <label className="text-sm text-gray-600">
              Remarks (required on rejection)
            </label>

            <textarea
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter rejection remarks..."
              value={remark}
              onChange={e => setRemark(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}