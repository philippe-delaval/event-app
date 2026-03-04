"use server";

import { CoreRepositoriesLive } from "@/core/repositories";
import { revalidatePath } from "next/cache";

export async function updateAttendeeStatusAction(
  eventId: number,
  attendeeId: number,
  newStatus: string
) {
  if (
    !["PENDING", "CONFIRMED", "CANCELLED", "ATTENDED"].includes(newStatus)
  ) {
    throw new Error("Invalid status");
  }

  await CoreRepositoriesLive.registrationsRepository.updateStatus(
    eventId,
    attendeeId,
    newStatus as "PENDING" | "CONFIRMED" | "CANCELLED" | "ATTENDED"
  );

  revalidatePath("/dashboard/participants");
}
