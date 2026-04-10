import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import BarcodeDisplay from '../../components/BarcodeDisplay'

export default function ProductCatalog() {
  const { data, addProduct, updateProduct, deleteProduct } = useApp()

  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: '',
    price: 0,
    description: '',
  })

  const [editId, setEditId] = useState(null)

  function submit(e) {
    e.preventDefault()

    if (!form.name) return alert('Name required')

    if (editId) {
      updateProduct(editId, form)
      alert('Product updated')
      setEditId(null)
    } else {
      const p = addProduct(form)
      alert('Product added: ' + p.name)
    }

    setForm({ name: '', sku: '', category: '', price: 0, description: '' })
  }

  function startEdit(p) {
    setEditId(p.id)
    setForm({
      name: p.name,
      sku: p.sku,
      category: p.category,
      price: p.price,
      description: p.description,
    })
  }

  function remove(id) {
    if (!confirm('Delete product?')) return
    deleteProduct(id)
  }

  function cancelEdit() {
    setEditId(null)
    setForm({ name: '', sku: '', category: '', price: 0, description: '' })
  }

  return (
    <div className="p-4 md:p-6 w-full">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Product Catalog
        </h2>
        <p className="text-sm text-gray-500">
          Manage your products and inventory
        </p>
      </div>

      {/* Form */}
      <div className="bg-white p-5 rounded-xl shadow border mb-6">
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) =>
              setForm({ ...form, sku: e.target.value })
            }
          />

          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <input
            type="number"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: parseFloat(e.target.value || 0),
              })
            }
          />

          <textarea
            className="border rounded-lg px-3 py-2 md:col-span-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="md:col-span-2 flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              {editId ? 'Update Product' : 'Add Product'}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      {/* Table / Cards */}
<div className="bg-white p-5 rounded-xl shadow border">
  <h3 className="font-semibold text-gray-800 mb-4">
    Products List
  </h3>

  {/* ✅ Desktop Table */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-50 text-gray-600">
        <tr>
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">SKU</th>
          <th className="px-4 py-3 text-left">Category</th>
          <th className="px-4 py-3 text-left">Price</th>
          <th className="px-4 py-3 text-left">Barcode</th>
          <th className="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.products.map((p) => (
          <tr key={p.id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">{p.name}</td>
            <td className="px-4 py-3">{p.sku}</td>
            <td className="px-4 py-3">{p.category}</td>
            <td className="px-4 py-3 font-semibold">₹{p.price}</td>
            <td className="px-4 py-3">
              <BarcodeDisplay value={p.sku || p.id} />
            </td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="px-3 py-1 text-xs bg-gray-200 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ✅ Mobile Cards */}
  <div className="md:hidden space-y-4">
    {data.products.map((p) => (
      <div
        key={p.id}
        className="border rounded-lg p-4 shadow-sm"
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-gray-800">
            {p.name}
          </h4>
          <span className="text-sm font-semibold text-green-600">
            ₹{p.price}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-1">
          SKU: {p.sku}
        </p>

        <p className="text-sm text-gray-500 mb-2">
          Category: {p.category}
        </p>

        <div className="mb-3">
          <BarcodeDisplay value={p.sku || p.id} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => startEdit(p)}
            className="flex-1 bg-gray-200 py-2 rounded text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => remove(p.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}

    {data.products.length === 0 && (
      <p className="text-center text-gray-400">
        No products available
      </p>
    )}
  </div>
</div>
    </div>
  )
}