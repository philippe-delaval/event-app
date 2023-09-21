import { z } from "zod";
import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees-repository";
import { RegistrationsRepository } from "../repositories/registrations-repository";

export async function registerToEvent(
  command: RegistrationCommand
): Promise<void> {
  const transformedCommand = transformRegistrationCommand(command);
  const validatedCommand = validateRegistrationCommand(transformedCommand);

  await registerAttendee(validatedCommand);
}

const ATTENDEE_NAME_REGEX =
  /^[a-zA-ZàáâäãåąćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĻŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð .'-]+$/u;

function transformRegistrationCommand(
  command: RegistrationCommand
): RegistrationCommand {
  return z
    .object({
      firstName: z.string().trim(),
      lastName: z.string().trim(),
    })
    .parse(command);
}

function validateRegistrationCommand(
  command: RegistrationCommand
): RegistrationCommand {
  const registrationCommandSchema = z.object({
    firstName: getAttendeeNameValidator(),
    lastName: getAttendeeNameValidator(),
  });

  return registrationCommandSchema.parse(command);
}

function getAttendeeNameValidator() {
  return z.string().min(2).max(250).regex(ATTENDEE_NAME_REGEX);
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
