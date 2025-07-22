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
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Book a Resource</h1>

      <select
        name="resource"
        value={form.resource}
        onChange={handleChange}
        className="w-full p-2 border"
      >
        <option value="">Select Resource</option>
        <option value="Room A">Room A</option>
        <option value="Room B">Room B</option>
        <option value="Device X">Device X</option>
      </select>

      <input
        name="startTime"
        type="datetime-local"
        value={form.startTime}
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <input
        name="endTime"
        type="datetime-local"
        value={form.endTime}
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <input
        name="requestedBy"
        type="text"
        placeholder="Your Name"
        value={form.requestedBy}
        onChange={handleChange}
        className="w-full p-2 border"
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Submit
      </button>
    </div>
  );
}
