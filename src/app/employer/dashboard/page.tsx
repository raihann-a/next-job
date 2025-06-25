'use client'

import { useEffect, useState } from 'react'
import { getJobs, saveJobs, Job } from '@/lib/jobs'
import Link from 'next/link'

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const data = getJobs()
    setJobs(data)
  }, [])

  const handleDelete = (id: string) => {
    const confirmed = window.confirm('Yakin ingin menghapus lowongan ini?')
    if (!confirmed) return

    const updatedJobs = jobs.filter((job) => job.id !== id)
    setJobs(updatedJobs)
    saveJobs(updatedJobs)
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard Employer</h1>
        <Link
          href="/employer/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Lowongan
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-600">Belum ada lowongan.</p>
      ) : (
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Judul</th>
              <th className="p-3">Perusahaan</th>
              <th className="p-3">Lokasi</th>
              <th className="p-3">Tipe</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-3">{job.title}</td>
                <td className="p-3">{job.company}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">{job.type}</td>
                <td className="p-3 space-x-3">
                  <Link
                    href={`/jobs/${job.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Lihat
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
