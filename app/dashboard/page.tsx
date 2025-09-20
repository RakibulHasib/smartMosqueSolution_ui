"use client";

import { useEffect, useState } from "react";
import { getByDay } from "prayertiming";
import Loader from "../../components/loader";

export default function DashboardPage() {
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Determine timezone offset automatically
        const timezoneOffset = new Date().getTimezoneOffset() / -60;

        // Get today's prayer times
        const times = getByDay({
          lat: latitude,
          long: longitude,
          timezone: timezoneOffset,
          method: "MWL", // Muslim World League
          timeFormat: "12h", // 24-hour format
        });

        setPrayerTimes(times);
      },
      () => setError("Unable to retrieve your location.")
    );
  }, []);

  const mosqueServices = [
    "Daily Prayers",
    "Friday Jumu'ah Prayer",
    "Quran Classes",
    "Community Events",
    "Charity & Donations",
  ];

  const informativeTips = [
    "Arrive early for prayers to secure a spot.",
    "Bring your own prayer mat for hygiene.",
    "Respect mosque rules and silence mobile phones.",
    "Participate in community events for social welfare.",
    "Donate to mosque charity funds to support maintenance.",
  ];

  if (error) return <p className="text-red-500">{error}</p>;
  if (!prayerTimes) return <Loader message="Fetching prayer times" />;

  // Remove the "date" field from Object.entries to avoid React rendering Date
  const entries = Object.entries(prayerTimes).filter(([key]) => key !== "date");

  return (
    <div className="space-y-12">
      {/* Prayer Times */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Prayer Times (Your Location)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {entries.map(([name, time]: any) => (
            <div
              key={name}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center transition-colors"
            >
              <p className="font-semibold capitalize">{name}</p>
              <p>
                {time instanceof Date
                  ? time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : time}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mosqueServices.map((service) => (
            <li
              key={service}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center transition-colors"
            >
              {service}
            </li>
          ))}
        </ul>
      </section>

      {/* Informative Tips */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Helpful Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {informativeTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      {/* About Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">About Mosques</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Mosques are places of worship for Muslims, serving as community
          centers for prayer, education, and social gatherings. They play a
          crucial role in spiritual and social life. They also host charity
          programs, educational activities, and provide guidance to the
          community.
        </p>
      </section>
    </div>
  );
}
