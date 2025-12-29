"use server";

import { CoreUseCasesLive } from "@/core/use-cases";
import { ZodError } from "zod";

export async function formInscriptionAction(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    await CoreUseCasesLive.registerToEvent({
      firstName: formData.get("first-name")?.toString() ?? "",
      lastName: formData.get("last-name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      jobTitle: formData.get("job-title")?.toString() ?? "",
      company: formData.get("company")?.toString() ?? "",
      marketingConsent: formData.get("marketing-consent") === "on",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.errors.map((error) => ({
          path: error.path.join("."),
          message: error.message,
        })),
      };
    }

    console.error(error);

    return {
      success: false,
      errors: [
        {
          path: "unknown",
          message: "An unexpected error occurred. Please try again later.",
        },
      ],
    };
  }

  return {
    success: true,
  };
}

export interface ActionResponse {
  success: boolean;
  errors?: {
    path: string;
    message: string;
  }[];
}
