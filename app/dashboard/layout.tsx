import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      {/* Optional Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-700 dark:to-blue-900 text-white py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to the Mosque Info Portal
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Explore mosques, prayer schedules, community services, and more.
        </p>
      </section>

      {/* Page Content */}
      <main className="mx-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
