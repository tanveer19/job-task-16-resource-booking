"use client";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  resource: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
};

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then(setBookings);
  }, []);

  const getStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Ongoing";
    return "Past";
  };

  const grouped = bookings.reduce((acc, booking) => {
    acc[booking.resource] = acc[booking.resource] || [];
    acc[booking.resource].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Booking Dashboard</h1>

        {Object.entries(grouped).map(([resource, items]) => (
          <div
            key={resource}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
          >
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              {resource}
            </h2>
            <ul className="space-y-4">
              {items
                .sort(
                  (a, b) =>
                    new Date(a.startTime).getTime() -
                    new Date(b.startTime).getTime()
                )
                .map((b) => (
                  <li
                    key={b.id}
                    className="p-4 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">{b.requestedBy}</span>
                      <span className="text-sm px-2 py-1 rounded bg-gray-200 dark:bg-gray-600">
                        {getStatus(b.startTime, b.endTime)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(b.startTime).toLocaleString()} →{" "}
                      {new Date(b.endTime).toLocaleString()}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
