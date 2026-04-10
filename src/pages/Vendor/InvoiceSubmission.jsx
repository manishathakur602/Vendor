import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function InvoiceSubmission() {
  const { data, submitInvoice, currentVendor } = useApp()

  if (!currentVendor) {
    return (
      <div className="p-4">
        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <h3 className="text-lg font-semibold">
            Please sign in to submit invoices
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
    items: [{ desc: '', qty: 1, rate: 0 }],
    dueDate: '',
  })

  function addLine() {
    setForm((f) => ({
      ...f,
      items: [...f.items, { desc: '', qty: 1, rate: 0 }],
    }))
  }

  function updateItem(index, key, value) {
    const updated = [...form.items]
    updated[index][key] = value
    setForm({ ...form, items: updated })
  }

  function getTotal() {
    return form.items.reduce((s, i) => s + i.qty * i.rate, 0)
  }

  function submit(e) {
    e.preventDefault()

    const inv = {
      invoiceNumber: 'INV-' + Date.now(),
      vendorId: currentVendor.id,
      poId: form.poId,
      items: form.items,
      amount: getTotal(),
      dueDate: form.dueDate,
    }

    submitInvoice(inv)
    alert('Invoice submitted successfully')

    setForm({
      poId: '',
      items: [{ desc: '', qty: 1, rate: 0 }],
      dueDate: '',
    })
  }

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Submit Invoice
      </h2>

      <div className="bg-white p-5 rounded-xl shadow border">

        <form onSubmit={submit} className="space-y-6">

          {/* PO Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select PO
            </label>
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
          </div>

          {/* Line Items */}
          <div>
            <h3 className="font-semibold mb-2">Items</h3>

            <div className="space-y-3">
              {form.items.map((it, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3"
                >
                  <input
                    placeholder="Description"
                    value={it.desc}
                    onChange={(e) =>
                      updateItem(idx, 'desc', e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                  />

                  <input
                    type="number"
                    placeholder="Qty"
                    value={it.qty}
                    onChange={(e) =>
                      updateItem(
                        idx,
                        'qty',
                        parseInt(e.target.value || 0)
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  />

                  <input
                    type="number"
                    placeholder="Rate"
                    value={it.rate}
                    onChange={(e) =>
                      updateItem(
                        idx,
                        'rate',
                        parseFloat(e.target.value || 0)
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  />

                  <div className="flex items-center font-semibold text-gray-700">
                    ₹ {it.qty * it.rate}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addLine}
              className="mt-3 text-sm bg-gray-200 px-3 py-2 rounded"
            >
              + Add Line
            </button>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Total */}
          <div className="text-right text-lg font-bold">
            Total: ₹ {getTotal()}
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Submit Invoice
            </button>

            <button
              type="button"
              onClick={() => alert(`Total: ₹ ${getTotal()}`)}
              className="bg-gray-200 px-5 py-2 rounded-lg"
            >
              Calculate
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}