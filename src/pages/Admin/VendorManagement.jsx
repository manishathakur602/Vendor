import React from 'react'
import { useApp } from '../../context/AppContext'

export default function VendorManagement() {
  const { data, updateVendor } = useApp()

  function setStatus(id, status) {
    updateVendor(id, { status })
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-600'
      case 'Inactive':
        return 'bg-gray-200 text-gray-600'
      case 'Blacklisted':
        return 'bg-red-100 text-red-600'
      case 'Pending':
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
          Vendor Management
        </h2>
        <p className="text-sm text-gray-500">
          Manage vendor status and details
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            {/* Head */}
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Update Status</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.vendors.map((v) => (
                <tr
                  key={v.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {v.company}
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                        v.status
                      )}`}
                    >
                      {v.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div>{v.contact}</div>
                    <div className="text-xs text-gray-400">
                      {v.email}
                    </div>
                  </td>

                  {/* Dropdown */}
                  <td className="px-4 py-3">
                    <select
                      className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={v.status}
                      onChange={(e) =>
                        setStatus(v.id, e.target.value)
                      }
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Blacklisted</option>
                      <option>Pending</option>
                    </select>
                  </td>
                </tr>
              ))}

              {data.vendors.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-400"
                  >
                    No vendors found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}