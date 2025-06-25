'use client'

import { useEffect, useState } from 'react'

type Application = {
  jobId: string
  jobTitle: string
  name: string
  email: string
  message: string
}

export default function ApplicationListPage() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('applicationsData')
    const parsed = stored ? JSON.parse(stored) : []
    setApplications(parsed)
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Daftar Lamaran Masuk</h1>

      {applications.length === 0 ? (
        <p className="text-gray-600">Belum ada lamaran yang masuk.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <h2 className="text-lg font-semibold text-blue-800">
                {app.name} <span className="text-sm text-gray-500">({app.email})</span>
              </h2>
              <p className="mt-1 text-sm text-gray-700">
                Melamar posisi: <strong>{app.jobTitle}</strong>
              </p>
              <div className="mt-2 p-3 bg-gray-100 rounded text-sm whitespace-pre-wrap">
                {app.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
