"use server";

import { z } from "zod";
import { CoreUseCasesLive } from "@/core/use-cases";

const contactSchema = z.object({
  firstname: z.string().min(2).max(20),
  lastname: z.string().min(2).max(30),
  email: z.string().email().max(60),
  message: z.string().min(10).max(500),
});

type State = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
} | null;

export async function submitContactForm(prevState: State, formData: FormData) {
  const data = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Veuillez vérifier les champs du formulaire.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await CoreUseCasesLive.sendContactEmail(validatedFields.data);
    return {
      success: true,
      message: "Votre message a bien été envoyé !",
    };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'envoi du message.",
    };
  }
}
