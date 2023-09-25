"use server";

import { CoreUseCases } from "../../../../core/use-cases";
import { ZodError } from "zod";

export async function formInscriptionAction(formData: FormData) {
  try {
    await CoreUseCases.registerToEvent({
      firstName: formData.get("first-name")?.toString() ?? "",
      lastName: formData.get("last-name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? ""
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.errors,
      };
    }
  }

  return {
    success: true,
  };
}
