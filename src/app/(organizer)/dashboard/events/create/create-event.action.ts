"use server";

import { z } from "zod";
import { CoreRepositoriesLive } from "@/core/repositories";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const eventSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  begin_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Date de début invalide",
  }),
  end_date: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Date de fin invalide",
    }),
  location: z.string().optional(),
  max_capacity: z.coerce.number().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]).default("DRAFT"),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

type State = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
} | null;

export async function createEventAction(prevState: State, formData: FormData) {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    begin_date: formData.get("begin_date"),
    end_date: formData.get("end_date"),
    location: formData.get("location"),
    max_capacity: formData.get("max_capacity"),
    image_url: formData.get("image_url"),
    status: formData.get("status"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  };

  const validatedFields = eventSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Veuillez vérifier les champs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await CoreRepositoriesLive.appEventsRepository.createEvent({
      name: validatedFields.data.name,
      description: validatedFields.data.description,
      begin_date: new Date(validatedFields.data.begin_date),
      end_date: validatedFields.data.end_date
        ? new Date(validatedFields.data.end_date)
        : undefined,
      location: validatedFields.data.location || undefined,
      max_capacity: validatedFields.data.max_capacity || undefined,
      image_url: validatedFields.data.image_url || undefined,
      status: validatedFields.data.status,
      latitude: validatedFields.data.latitude || undefined,
      longitude: validatedFields.data.longitude || undefined,
    });

    revalidatePath("/");
    revalidatePath("/oldevents");
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      success: false,
      message: "Erreur lors de la création de l'événement.",
    };
  }
  
  redirect("/dashboard");
}
