"use server";

import { redirect } from "next/navigation";
import { CoreUseCases } from "../../../../core/use-cases";
import { ZodError } from "zod";

export async function formInscriptionAction(formData: FormData) {
  try {
    await CoreUseCases.registerToEvent({
      firstName: formData.get("first-name")?.toString() ?? "",
      lastName: formData.get("last-name")?.toString() ?? "",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        errors: error.errors,
      };
    }
  }

  redirect("/validation-inscription");
}
