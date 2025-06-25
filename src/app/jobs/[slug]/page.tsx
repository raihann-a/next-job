'use client'

import { jobs } from '@/data/jobs'
import { notFound } from 'next/navigation'
import { useState } from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default function JobDetailPage({ params }: Props) {
  const job = jobs.find((job) => job.slug === params.slug)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [success, setSuccess] = useState(false)

  if (!job) return notFound()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const stored = localStorage.getItem('applicationsData')
    const applications = stored ? JSON.parse(stored) : []

    const newApplication = {
      jobId: job.id,
      jobTitle: job.title,
      ...formData,
    }

    applications.push(newApplication)
    localStorage.setItem('applicationsData', JSON.stringify(applications))

    setFormData({ name: '', email: '', message: '' })
    setSuccess(true)
    setIsOpen(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600 mt-1">{job.company} – {job.location}</p>
      <p className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">{job.type}</p>

      <div className="mt-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-2">Deskripsi Pekerjaan</h2>
        <p>{job.description}</p>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Lamar Sekarang
      </button>

      {success && (
        <div className="mt-4 text-green-600 font-medium">Lamaran berhasil dikirim!</div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Form Lamaran</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded px-3 py-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full border rounded px-3 py-2"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Pesan</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Kirim Lamaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
