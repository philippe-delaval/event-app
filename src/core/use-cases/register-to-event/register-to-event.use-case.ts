import { AttendeesRepository } from "@/core/repositories/attendees-repository";
import { RegistrationsRepository } from "@/core/repositories/registrations-repository";
import {
  RegistrationCommand,
  RegistrationCommandDto,
} from "./registration.command";

export async function registerToEventUseCase(
  dependencies: {
    attendeesRepository: AttendeesRepository;
    registrationsRepository: RegistrationsRepository;
  },
  commandDto: RegistrationCommandDto
): Promise<void> {
  const command = new RegistrationCommand(commandDto);

  const attendeeId = await dependencies.attendeesRepository.add({
    first_name: command.firstName,
    last_name: command.lastName,
    email: command.email,
  });
  await dependencies.registrationsRepository.add(1, attendeeId);
}
