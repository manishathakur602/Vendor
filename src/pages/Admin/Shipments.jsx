import React from 'react'
import { useApp } from '../../context/AppContext'

function trackingUrl(courier, tracking) {
  if (!tracking) return null

  const t = encodeURIComponent(tracking)
  const c = (courier || '').toLowerCase()

  if (c.includes('dhl'))
    return `https://www.dhl.com/en/express/tracking.html?AWB=${t}`
  if (c.includes('fedex'))
    return `https://www.fedex.com/apps/fedextrack/?tracknumbers=${t}`
  if (c.includes('ups'))
    return `https://www.ups.com/track?tracknum=${t}`
  if (c.includes('usps'))
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${t}`

  return `https://www.google.com/search?q=${encodeURIComponent(
    courier + ' ' + tracking
  )}`
}

export default function AdminShipments() {
  const { data } = useApp()

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Shipments Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Track and manage all shipments
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white p-5 rounded-xl shadow border">

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">

            {/* Head */}
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">PO</th>
                <th className="px-4 py-3 text-left">Vendor</th>
                <th className="px-4 py-3 text-left">Tracking</th>
                <th className="px-4 py-3 text-left">Courier</th>
                <th className="px-4 py-3 text-left">Dispatch</th>
                <th className="px-4 py-3 text-left">ETA</th>
                <th className="px-4 py-3 text-left">Created</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data.shipments.map((s) => {
                const vendor =
                  data.vendors.find((v) => v.id === s.vendorId)
                    ?.company || s.vendorId

                return (
                  <tr
                    key={s.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {s.poId}
                    </td>

                    <td className="px-4 py-3">{vendor}</td>

                    <td className="px-4 py-3">
                      {s.tracking ? (
                        <a
                          href={trackingUrl(s.courier, s.tracking)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {s.tracking}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {s.courier ? (
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                          {s.courier}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {s.dispatchDate || '-'}
                    </td>

                    <td className="px-4 py-3">
                      {s.eta ? (
                        <span className="text-green-600 font-medium">
                          {s.eta}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleString()
                        : '-'}
                    </td>
                  </tr>
                )
              })}

              {data.shipments.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-400"
                  >
                    No shipments found
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