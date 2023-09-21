import { z } from "zod";
import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees-repository";
import { RegistrationsRepository } from "../repositories/registrations-repository";

export async function registerToEvent(
  command: RegistrationCommand
): Promise<void> {
  const satinitizedFirstName = validateAndTransformFirstName(command.firstName);
  const satinitizedLastName = validateAndTransformLastName(command.lastName);

  await registerAttendee({
    firstName: satinitizedFirstName,
    lastName: satinitizedLastName,
  });
}

const ATTENDEE_NAME_REGEX =
  /^[a-zA-ZàáâäãåąćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĻŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð .'-]+$/u;

function validateAndTransformFirstName(firstName: string): string {
  const firstNameSchema = z.object({
    firstName: z.string().min(2).max(250).regex(ATTENDEE_NAME_REGEX).trim(),
  });

  return firstNameSchema.parse({ firstName }).firstName;
}

function validateAndTransformLastName(lastName: string): string {
  const lastNameSchema = z.object({
    lastName: z.string().min(2).max(250).regex(ATTENDEE_NAME_REGEX).trim(),
  });

  return lastNameSchema.parse({ lastName }).lastName;
}

async function registerAttendee(command: RegistrationCommand) {
  const knexClient = await getKnexClient();

  const attendeesRepository = new AttendeesRepository(knexClient);
  const attendeeId = await attendeesRepository.add({
    first_name: command.firstName,
    last_name: command.lastName,
  });

  const registerRepository = new RegistrationsRepository(knexClient);
  await registerRepository.add(1, attendeeId);
}

export interface RegistrationCommand {
  lastName: string;
  firstName: string;
}
