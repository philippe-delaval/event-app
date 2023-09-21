import { getKnexClient } from "@/core/lib/knex";
import { AttendeesRepository } from "@/core/repositories/attendees-repository";
import { RegistrationsRepository } from "@/core/repositories/registrations-repository";
import {
  RegistrationCommand,
  RegistrationCommandDto,
} from "./registration.command";

export async function registerToEvent(
  commandDto: RegistrationCommandDto
): Promise<void> {
  const command = new RegistrationCommand(commandDto);

  await registerAttendee(command);
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
