import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function VendorSignup() {
  const { addVendor } = useApp()

  const [form, setForm] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    bank: '',
    account: '',
    docs: [],
  })

  const [error, setError] = useState('')

  function handleFile(e) {
    const files = Array.from(e.target.files || [])
    setForm((f) => ({
      ...f,
      docs: files.map((fi) => ({
        name: fi.name,
        size: fi.size,
      })),
    }))
  }

  function submit(e) {
    e.preventDefault()
    setError('')

    if (!form.company.trim())
      return setError('Company name is required')

    if (!form.contact.trim())
      return setError('Contact person is required')

    if (!form.email.trim())
      return setError('Email is required')

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return setError('Enter a valid email')

    addVendor(form)

    alert(
      'Signup submitted. You will receive approval notification from admin.'
    )

    setForm({
      company: '',
      contact: '',
      email: '',
      phone: '',
      bank: '',
      account: '',
      docs: [],
    })
  }

  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4">

      <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-2xl shadow border">

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Vendor Signup
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Register your company to start supplying products<br/>
           <b> All filed are Required</b>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          {/* Company */}
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Company Name"
            value={form.company}
            onChange={(e) =>
              setForm({ ...form, company: e.target.value })
            }
          />

          {/* Contact */}
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Contact Person"
            value={form.contact}
            onChange={(e) =>
              setForm({ ...form, contact: e.target.value })
            }
          />

          {/* Email */}
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Phone */}
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          {/* Bank */}
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Bank Name"
            value={form.bank}
            onChange={(e) =>
              setForm({ ...form, bank: e.target.value })
            }
          />

          {/* Account */}
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Account Number"
            value={form.account}
            onChange={(e) =>
              setForm({ ...form, account: e.target.value })
            }
          />

          {/* File Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Upload Documents (PDF, JPG)
            </label>

            <input
              type="file"
              multiple
              onChange={handleFile}
              className="w-full border rounded-lg px-3 py-2"
            />

            {form.docs.length > 0 && (
              <div className="text-sm text-gray-600 mt-2">
                Uploaded: {form.docs.map((d) => d.name).join(', ')}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-2">
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
              Submit for Approval
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}