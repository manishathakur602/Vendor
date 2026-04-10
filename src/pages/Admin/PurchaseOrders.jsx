import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function PurchaseOrders() {
  const { data, createPO } = useApp()

  const [form, setForm] = useState({
    vendorId: '',
    lineItems: [{ desc: '', qty: 1, rate: 0 }],
    deliveryDate: '',
    terms: '',
  })

  function addLine() {
    setForm((f) => ({
      ...f,
      lineItems: [...f.lineItems, { desc: '', qty: 1, rate: 0 }],
    }))
  }

  function updateLine(index, field, value) {
    const arr = [...form.lineItems]
    arr[index][field] = value
    setForm({ ...form, lineItems: arr })
  }

  function removeLine(index) {
    const arr = form.lineItems.filter((_, i) => i !== index)
    setForm({ ...form, lineItems: arr })
  }

  function submit(e) {
    e.preventDefault()
    if (!form.vendorId) return alert('Select vendor')

    const po = {
      poNumber: 'PO-' + Date.now(),
      vendorId: form.vendorId,
      lineItems: form.lineItems,
      deliveryDate: form.deliveryDate,
      terms: form.terms,
      status: 'Pending',
    }

    createPO(po)

    setForm({
      vendorId: '',
      lineItems: [{ desc: '', qty: 1, rate: 0 }],
      deliveryDate: '',
      terms: '',
    })
  }

  const totalAmount = form.lineItems.reduce(
    (sum, li) => sum + li.qty * li.rate,
    0
  )

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Purchase Orders
        </h2>
        <p className="text-sm text-gray-500">
          Create and manage your purchase orders
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white p-5 rounded-xl shadow border mb-6">
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Vendor */}
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            value={form.vendorId}
            onChange={(e) =>
              setForm({ ...form, vendorId: e.target.value })
            }
          >
            <option value="">Select Vendor</option>
            {data.vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.company}
              </option>
            ))}
          </select>

          {/* Date */}
          <input
            type="date"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            value={form.deliveryDate}
            onChange={(e) =>
              setForm({ ...form, deliveryDate: e.target.value })
            }
          />

          {/* LINE ITEMS */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-700">
                Line Items
              </h4>

              <button
                type="button"
                onClick={addLine}
                className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200"
              >
                + Add Item
              </button>
            </div>

            {form.lineItems.map((li, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 items-center"
              >
                <input
                  className="border rounded-lg px-3 py-2"
                  placeholder="Description"
                  value={li.desc}
                  onChange={(e) =>
                    updateLine(idx, 'desc', e.target.value)
                  }
                />

                <input
                  type="number"
                  className="border rounded-lg px-3 py-2"
                  value={li.qty}
                  onChange={(e) =>
                    updateLine(
                      idx,
                      'qty',
                      parseInt(e.target.value || 0)
                    )
                  }
                />

                <input
                  type="number"
                  className="border rounded-lg px-3 py-2"
                  value={li.rate}
                  onChange={(e) =>
                    updateLine(
                      idx,
                      'rate',
                      parseFloat(e.target.value || 0)
                    )
                  }
                />

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">
                    ₹{li.qty * li.rate}
                  </span>

                  {form.lineItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLine(idx)}
                      className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="text-right font-semibold text-lg text-gray-800 mt-2">
              Total: ₹{totalAmount}
            </div>
          </div>

          {/* Terms */}
          <textarea
            className="border rounded-lg px-3 py-2 md:col-span-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Terms & Conditions"
            value={form.terms}
            onChange={(e) =>
              setForm({ ...form, terms: e.target.value })
            }
          />

          {/* Button */}
          <div className="md:col-span-2">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Create Purchase Order
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h3 className="font-semibold text-gray-800 mb-4">
          Purchase Orders List
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">PO#</th>
                <th className="px-4 py-3 text-left">Vendor</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Amount</th>
              </tr>
            </thead>

            <tbody>
              {data.pos.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {p.poNumber}
                  </td>

                  <td className="px-4 py-3">
                    {
                      data.vendors.find(
                        (v) => v.id === p.vendorId
                      )?.company
                    }
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                      {p.status || 'Pending'}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    ₹
                    {(p.lineItems || []).reduce(
                      (s, li) => s + li.qty * li.rate,
                      0
                    )}
                  </td>
                </tr>
              ))}

              {data.pos.length === 0 && (
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
      </div>
    </div>
  )
}