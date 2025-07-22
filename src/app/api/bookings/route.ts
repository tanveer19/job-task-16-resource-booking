import { bookings } from "@/lib/bookings";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { resource, startTime, endTime, requestedBy } = await req.json();

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) {
    return new NextResponse("End time must be after start time.", {
      status: 400,
    });
  }

  const duration = (end.getTime() - start.getTime()) / (1000 * 60); // in minutes
  if (duration < 15) {
    return new NextResponse("Minimum duration is 15 minutes.", { status: 400 });
  }

  const bufferMs = 10 * 60 * 1000;

  const hasConflict = bookings.some((b) => {
    if (b.resource !== resource) return false;

    const existingStart = new Date(b.startTime).getTime() - bufferMs;
    const existingEnd = new Date(b.endTime).getTime() + bufferMs;

    return start.getTime() < existingEnd && end.getTime() > existingStart;
  });

  if (hasConflict) {
    return new NextResponse(
      "Booking overlaps with existing booking or buffer time.",
      { status: 409 }
    );
  }

  bookings.push({ id: uuidv4(), resource, startTime, endTime, requestedBy });

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resource = searchParams.get("resource");
  const date = searchParams.get("date");

  let filtered = bookings;

  if (resource) {
    filtered = filtered.filter((b) => b.resource === resource);
  }

  if (date) {
    const targetDate = new Date(date).toISOString().split("T")[0];
    filtered = filtered.filter((b) => b.startTime.startsWith(targetDate));
  }

  return NextResponse.json(filtered);
}
