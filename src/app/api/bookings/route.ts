import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { Booking } from "@prisma/client";
export async function POST(req: Request) {
  const body = await req.json();
  const { resource, startTime, endTime, requestedBy } = body;

  const start = new Date(startTime);
  const end = new Date(endTime);

  const bufferMinutes = 10;

  const bufferStart = new Date(start.getTime() - bufferMinutes * 60000);
  const bufferEnd = new Date(end.getTime() + bufferMinutes * 60000);

  const conflict = await prisma.booking.findFirst({
    where: {
      resource,
      OR: [
        {
          startTime: { lte: bufferEnd },
          endTime: { gte: bufferStart },
        },
      ],
    },
  });

  if (conflict) {
    return new NextResponse("Booking conflict", { status: 409 });
  }

  const booking = await prisma.booking.create({
    data: { resource, startTime: start, endTime: end, requestedBy },
  });

  return NextResponse.json(booking);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resource = searchParams.get("resource") || undefined;
  const date = searchParams.get("date") || undefined;

  const where: Prisma.BookingWhereInput = {};
  if (resource) where.resource = resource;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    where.startTime = { gte: start, lt: end };
  }

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { startTime: "asc" },
  });

  return NextResponse.json(bookings);
}
