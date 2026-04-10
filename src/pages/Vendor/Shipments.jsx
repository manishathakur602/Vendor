import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function Shipments() {
  const { data, updateShipment, currentVendor } = useApp()

  if (!currentVendor) {
    return (
      <div className="p-4">
        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <h3 className="text-lg font-semibold">
            Please sign in to manage shipments
          </h3>
        </div>
      </div>
    )
  }

  const myPOs = data.pos.filter(
    (p) => p.vendorId === currentVendor.id
  )

  const [form, setForm] = useState({
    poId: '',
    tracking: '',
    courier: '',
    dispatchDate: '',
    eta: '',
  })

  function submit(e) {
    e.preventDefault()

    if (!form.poId) return alert('Select PO')

    updateShipment(form.poId, {
      ...form,
      vendorId: currentVendor.id,
    })

    alert('Shipment updated successfully')

    setForm({
      poId: '',
      tracking: '',
      courier: '',
      dispatchDate: '',
      eta: '',
    })
  }

  const shipments = data.shipments.filter(
    (s) => s.vendorId === currentVendor.id
  )

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">
        Shipments
      </h2>

      {/* FORM */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h3 className="font-semibold mb-4">
          Create / Update Shipment
        </h3>

        <form onSubmit={submit} className="space-y-4">

          {/* PO */}
          <select
            value={form.poId}
            onChange={(e) =>
              setForm({ ...form, poId: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">Select PO</option>
            {myPOs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.poNumber}
              </option>
            ))}
          </select>

          {/* Tracking + Courier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder="Tracking Number"
              value={form.tracking}
              onChange={(e) =>
                setForm({ ...form, tracking: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              required
            />

            <input
              placeholder="Courier Service"
              value={form.courier}
              onChange={(e) =>
                setForm({ ...form, courier: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="date"
              value={form.dispatchDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  dispatchDate: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2"
              required
            />

            <input
              type="date"
              value={form.eta}
              onChange={(e) =>
                setForm({ ...form, eta: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Button */}
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Submit Shipment
          </button>
        </form>
      </div>

      {/* HISTORY */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h3 className="font-semibold mb-4">
          Shipment History
        </h3>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">PO</th>
                <th className="px-4 py-3 text-left">Tracking</th>
                <th className="px-4 py-3 text-left">Courier</th>
                <th className="px-4 py-3 text-left">Dispatch</th>
                <th className="px-4 py-3 text-left">ETA</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{s.poId}</td>
                  <td className="px-4 py-3">{s.tracking}</td>
                  <td className="px-4 py-3">{s.courier}</td>
                  <td className="px-4 py-3">
                    {s.dispatchDate}
                  </td>
                  <td className="px-4 py-3">{s.eta}</td>
                </tr>
              ))}

              {shipments.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-400"
                  >
                    No shipments yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {shipments.map((s) => (
            <div
              key={s.id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <h4 className="font-semibold mb-1">
                PO: {s.poId}
              </h4>

              <p className="text-sm text-gray-600">
                Tracking: {s.tracking}
              </p>

              <p className="text-sm text-gray-600">
                Courier: {s.courier}
              </p>

              <p className="text-sm text-gray-600">
                Dispatch: {s.dispatchDate}
              </p>

              <p className="text-sm text-gray-600">
                ETA: {s.eta}
              </p>
            </div>
          ))}

          {shipments.length === 0 && (
            <p className="text-center text-gray-400">
              No shipments yet
            </p>
          )}
        </div>
      </div>

    </div>
  )
}