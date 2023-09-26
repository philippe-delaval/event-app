import { AttendeesRepository } from "@/core/repositories/attendees.repository";
import { RegistrationsRepository } from "@/core/repositories/registrations.repository";
import {
  RegistrationCommand,
  RegistrationCommandDto,
} from "./registration.command";
import { EmailSender } from "@/core/lib/email-sender.lib";



export async function registerToEventUseCase(
  dependencies: {
    attendeesRepository: AttendeesRepository;
    registrationsRepository: RegistrationsRepository;
  },
  commandDto: RegistrationCommandDto,
): Promise<void> {
  const command = new RegistrationCommand(commandDto);

  const attendeeId = await dependencies.attendeesRepository.add({
    first_name: command.firstName,
    last_name: command.lastName,
    email: command.email,
  });
  await dependencies.registrationsRepository.add(1, attendeeId);

  const emailSender = new EmailSender();
  await emailSender.send({to: command.email,subject: 'Confirmation inscription',text: `<p>Merci pour votre inscription !</p>`});
}


