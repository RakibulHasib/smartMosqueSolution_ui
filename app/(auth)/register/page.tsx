"use client";

import { saveTokens } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    mosque_id: "68c07e8a8a29978b594a44cf",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${API_URL}${"/auth/register"}`;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Registration failed");

      const response = await res.json();

      saveTokens(response?.data?.accessToken); // localStorage
      // Redirect after login
      router.push("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Create an Account
      </h1>

      {error && (
        <p className="p-2 text-sm text-red-600 bg-red-100 rounded">{error}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Phone */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
