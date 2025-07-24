import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // extract the ID from the path

  if (!id) {
    return new NextResponse("Missing booking ID", { status: 400 });
  }

  try {
    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    return new NextResponse("Failed to delete booking", { status: 500 });
  }
}
