import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function VendorLogin() {
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  const { loginVendorByEmail } = useApp()
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    setError('')
    setInfo('')

    if (!identifier.trim()) {
      setError('Please enter your registered email or company name')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const v = loginVendorByEmail(identifier.trim())
      setLoading(false)

      if (!v) {
        setError('No vendor found with that email. Please signup first.')
        return
      }

      if (v.status !== 'Active') {
        setInfo(
          `Your account status is: ${v.status}. You can login after admin approval.`
        )
        return
      }

      navigate('/vendor')
    }, 500) // small delay for UX
  }

  return (
    <div className=" flex items-center justify-center bg-gray-50 p-4">

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow border">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Vendor Sign In
          </h2>
          <p className="text-sm text-gray-500">
            Access your vendor dashboard
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {info && (
          <div className="mb-4 bg-yellow-100 text-yellow-700 px-4 py-2 rounded">
            {info}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">

          <input
            placeholder="Email or Company name"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">
            Don’t have an account?
          </span>{' '}
          <Link
            to="/vendor/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Create account
          </Link>
        </div>

      </div>
    </div>
  )
}