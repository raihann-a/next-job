"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("employer");

  const handleLogin = async () => {
    localStorage.setItem("loggedInRole", role);

    // Set cookie
    await fetch("/api/auth/set-cookie", {
      method: "POST",
      body: JSON.stringify({ role }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (role === "employer") {
      router.push("/employer/dashboard");
    } else {
      router.push("/jobs");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-10 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login (Simulasi)</h1>

      <label className="block mb-2">Masuk sebagai:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      >
        <option value="employer">Employer</option>
        <option value="jobseeker">Jobseeker</option>
      </select>

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}
