'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getJobs, Job } from '@/lib/jobs'

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    const data = getJobs()
    setJobs(data)
    setFilteredJobs(data)
  }, [])

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(search.toLowerCase())
      const matchLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase())
      const matchCategory = category === '' || job.category.toLowerCase().includes(category.toLowerCase())
      return matchTitle && matchLocation && matchCategory
    })

    setFilteredJobs(filtered)
  }, [search, location, category, jobs])

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cari Lowongan Pekerjaan</h1>

      {/* Filter Form */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Cari berdasarkan judul"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Lokasi"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Kategori (IT, Design, dll.)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-600">Tidak ditemukan lowongan yang sesuai.</p>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <Link href={`/jobs/${job.slug}`} key={job.id}>
              <div className="p-4 border rounded-lg hover:shadow transition cursor-pointer">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p>{job.company} - {job.location}</p>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.type}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
