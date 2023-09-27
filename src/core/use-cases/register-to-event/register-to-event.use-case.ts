import { AttendeesRepository } from "@/core/repositories/attendees.repository";
import { RegistrationsRepository } from "@/core/repositories/registrations.repository";
import {
  RegistrationCommand,
  RegistrationCommandDto,
} from "./registration.command";
import { EmailSender } from "@/core/lib/email-sender.lib";
import { EmailAlreadyRegisteredError } from "./email-already-registered.error";

export async function registerToEventUseCase(
  dependencies: {
    attendeesRepository: AttendeesRepository;
    registrationsRepository: RegistrationsRepository;
    emailSender: EmailSender;
  },
  commandDto: RegistrationCommandDto,
): Promise<void> {
  const command = new RegistrationCommand(commandDto);

  const { attendeesRepository, registrationsRepository, emailSender } =
    dependencies;

  await checkEmailUnicity(attendeesRepository, command);

  await saveAttendeeAndRegistration(
    attendeesRepository,
    command,
    registrationsRepository,
  );

  await emailSender.send({
    to: command.email,
    subject: "Confirmation inscription",
    text: "Merci pour votre inscription !",
  });
}

async function checkEmailUnicity(
  attendeesRepository: AttendeesRepository,
  command: RegistrationCommand,
) {
  const attendeeWithEmail = await attendeesRepository.findByEmail(
    command.email,
  );

  if (attendeeWithEmail !== null) {
    throw new EmailAlreadyRegisteredError();
  }
}

async function saveAttendeeAndRegistration(
  attendeesRepository: AttendeesRepository,
  command: RegistrationCommand,
  registrationsRepository: RegistrationsRepository,
) {
  const attendeeId = await attendeesRepository.add({
    first_name: command.firstName,
    last_name: command.lastName,
    email: command.email,
  });
  await registrationsRepository.add(1, attendeeId);
}
