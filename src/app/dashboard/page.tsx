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
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Booking Dashboard</h1>
      {Object.entries(grouped).map(([resource, items]) => (
        <div key={resource} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{resource}</h2>
          <ul className="space-y-2">
            {items
              .sort(
                (a, b) =>
                  new Date(a.startTime).getTime() -
                  new Date(b.startTime).getTime()
              )
              .map((b) => (
                <li key={b.id} className="border p-2 rounded">
                  <div>
                    <strong>{b.requestedBy}</strong> (
                    {getStatus(b.startTime, b.endTime)})
                  </div>
                  <div>
                    {new Date(b.startTime).toLocaleString()} →{" "}
                    {new Date(b.endTime).toLocaleString()}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
