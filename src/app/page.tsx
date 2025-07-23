"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    resource: "",
    startTime: "",
    endTime: "",
    requestedBy: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Booking failed: " + (await res.text()));
    } else {
      alert("Booking successful!");
      setForm({ resource: "", startTime: "", endTime: "", requestedBy: "" });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center">Book a Resource</h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Resource</label>
            <select
              name="resource"
              value={form.resource}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select Resource</option>
              <option value="Room A">Room A</option>
              <option value="Room B">Room B</option>
              <option value="Device X">Device X</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Requested By</label>
            <input
              type="text"
              name="requestedBy"
              placeholder="Your name"
              value={form.requestedBy}
              onChange={handleChange}
              className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Submit Booking
          </button>
        </div>
      </div>
    </main>
  );
}
