"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getJobs, saveJobs, Job } from '@/lib/jobs'
import { v4 as uuidv4 } from 'uuid'

type JobFormData = {
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  description: string;
  slug: string;
};

export default function NewJobPage() {
  const { register, handleSubmit, reset } = useForm<JobFormData>();
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const onSubmit = (data: JobFormData) => {
  const jobs = getJobs() // Ambil semua data job lama dari localStorage atau mock
  const newJob: Job = {
    id: uuidv4(),
    ...data,
  }

  const updatedJobs = [...jobs, newJob] // Gabungkan job lama + job baru
  saveJobs(updatedJobs) // Simpan ke localStorage

  setSubmitted(true)
  reset()

  // Arahkan ke dashboard employer
  router.push("/employer/dashboard")
}


  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Tambah Lowongan Baru</h1>

      {submitted && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Lowongan berhasil ditambahkan!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Judul Pekerjaan</label>
          <input
            {...register("title", { required: true })}
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="Contoh: Frontend Developer"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Perusahaan</label>
          <input
            {...register("company", { required: true })}
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="Nama perusahaan"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Lokasi</label>
          <input
            {...register("location", { required: true })}
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="Kota atau Remote"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tipe Kerja</label>
          <select
            {...register("type", { required: true })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Pilih tipe kerja</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Kategori</label>
          <input
            {...register("category", { required: true })}
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="IT, Design, Marketing, dll."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Deskripsi Pekerjaan</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border rounded px-3 py-2"
            rows={5}
            placeholder="Deskripsikan pekerjaan secara detail"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Slug URL</label>
          <input
            {...register("slug", { required: true })}
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="frontend-developer"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Simpan Lowongan
        </button>
      </form>
    </div>
  );
}
