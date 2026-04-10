import React from 'react'
import { useApp } from '../../context/AppContext'
import BarcodeDisplay from '../../components/BarcodeDisplay'

export default function VendorProducts() {
  const { data, currentVendor } = useApp()

  if (!currentVendor) {
    return (
      <div className="p-4">
        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <h3 className="text-lg font-semibold">
            Please sign in to view products
          </h3>
        </div>
      </div>
    )
  }

  if (currentVendor.status !== 'Active') {
    return (
      <div className="p-4">
        <div className="bg-white p-5 rounded-xl shadow border">
          <h3 className="text-lg font-semibold mb-2">
            Product Catalog
          </h3>
          <p className="text-sm text-gray-500">
            Your account is not active yet. Products will be visible after approval.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Product Catalog
      </h2>

      <div className="bg-white p-5 rounded-xl shadow border">

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
              </tr>
            </thead>

            <tbody>
              {data.products.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {p.name}
                  </td>
                  <td className="px-4 py-3">{p.sku}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    ₹{p.price}
                  </td>
                  <td className="px-4 py-3">
                    <BarcodeDisplay value={p.sku || p.id} />
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

              <p className="text-sm text-gray-500">
                SKU: {p.sku}
              </p>

              <p className="text-sm text-gray-500 mb-2">
                Category: {p.category}
              </p>

              <div>
                <BarcodeDisplay value={p.sku || p.id} />
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