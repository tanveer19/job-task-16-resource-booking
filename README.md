# 🗓️ Resource Booking System

A full-stack web application for booking shared resources with conflict detection, buffer times, calendar view, and persistent storage — built with **Next.js App Router**, **Prisma**, **SQLite**, and **Tailwind CSS**.

## 🚀 Live Demo

👉 [Visit the live site](https://job-task-16-resource-booking.onrender.com/)

---

## ✨ Features

- 📅 Book any resource with start and end times
- ⚠️ Conflict detection with buffer time logic
- 🔐 Protected dashboard view
- 📊 Weekly calendar of all bookings
- 🗑️ Delete existing bookings
- ✅ Form validation and feedback
- 💾 SQLite + Prisma for persistent storage
- 🧪 API route handlers using Next.js App Router
- 🌈 Styled with Tailwind CSS & ShadCN UI

---

## 🧰 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/resource-booking-system.git
cd resource-booking-system
pnpm install

Set Up SQLite Database
pnpm prisma db push

Start Development Server
pnpm dev
```

Environment Variables
Create a .env file in the root:

DATABASE_URL="file:./dev.db"
