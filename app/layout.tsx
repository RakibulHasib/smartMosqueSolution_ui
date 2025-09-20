"use client";
import Link from "next/link";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import { isAuthenticated, logout } from "@/lib/auth";
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const [theme, setTheme] = useState("light");
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
      setAuth(isAuthenticated());
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${API_URL}${"/auth/logout"}`;

  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
          <h1 className="text-lg font-bold">Smart Mosque</h1>

          <div className="flex items-center gap-3">
            {/* Auth Buttons */}
            {!auth ? (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={async () => {
                  await fetch(url, {
                    method: "POST",
                    credentials: "include",
                  });
                  logout();
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors shadow-sm"
              >
                Logout
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
