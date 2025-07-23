import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const bookingId = params.id;

  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return NextResponse.json({ message: "Booking deleted" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to delete booking", { status: 500 });
  }
}
