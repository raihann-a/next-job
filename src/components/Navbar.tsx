'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('loggedInRole')
    setRole(stored)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInRole')
    setRole(null)
    router.push('/login')
  }

  return (
    <nav className="bg-gray-100 px-6 py-4 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-bold">NextJob</Link>

      <div className="space-x-4">
        <Link href="/jobs">Lowongan</Link>
        {role === 'employer' && (
          <>
            <Link href="/employer/dashboard">Dashboard</Link>
            <Link href="/employer/applications">Lamaran</Link>
          </>
        )}
        {role ? (
          <button onClick={handleLogout} className="text-red-600 font-semibold ml-4">
            Logout
          </button>
        ) : (
          <Link href="/login" className="text-blue-600 font-semibold">Login</Link>
        )}
      </div>
    </nav>
  )
}
