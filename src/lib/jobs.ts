import { jobs as defaultJobs } from '@/data/jobs'

export type Job = {
  id: string
  title: string
  company: string
  location: string
  type: string
  category: string
  description: string
  slug: string
}

const LOCAL_STORAGE_KEY = 'jobsData'

// Fungsi untuk ambil data jobs dari localStorage, kalau kosong pakai default mock data
export function getJobs(): Job[] {
  if (typeof window === 'undefined') return defaultJobs

  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!stored) return defaultJobs

    return JSON.parse(stored)
  } catch {
    return defaultJobs
  }
}

// Fungsi simpan data jobs ke localStorage
export function saveJobs(jobs: Job[]) {
  if (typeof window === 'undefined') return

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jobs))
}
