import { AttendeesRepository } from "@/core/repositories/attendees.repository";
import { RegistrationsRepository } from "@/core/repositories/registrations.repository";
import {
  RegistrationCommand,
  RegistrationCommandDto,
} from "./registration.command";
import { EmailSender } from "@/core/lib/email-sender.lib";
import { AttendeeEmailAlreadyRegisteredError } from "./attendee-email-already-registered.error";
import { RegistrationConfirmationHash } from "./registration-confirmation-hash";

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

  const registrationConfirmationHash = new RegistrationConfirmationHash(
    command.email,
  );

  await saveAttendeeAndRegistration(
    {
      attendeesRepository,
      registrationsRepository,
    },
    {
      command,
      registrationConfirmationHash,
    },
  );

  await emailSender.send({
    to: command.email,
    subject: "Veuillez confirmer votre inscription à l'événement Test Event",
    html: `
          <p>
            Pour la confirmer, veuillez cliquer sur le lien suivant : 
            <a href="http://localhost:3000/confirmer-inscription/${registrationConfirmationHash.toString()}">Confirmer l'inscription</a>
          </p>
        `,
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
    throw new AttendeeEmailAlreadyRegisteredError();
  }
}

async function saveAttendeeAndRegistration(
  dependencies: {
    attendeesRepository: AttendeesRepository;
    registrationsRepository: RegistrationsRepository;
  },
  options: {
    command: RegistrationCommand;
    registrationConfirmationHash: RegistrationConfirmationHash;
  },
) {
  const { attendeesRepository, registrationsRepository } = dependencies;
  const { command, registrationConfirmationHash } = options;

  const attendeeId = await attendeesRepository.add({
    first_name: command.firstName,
    last_name: command.lastName,
    email: command.email,
  });
  await registrationsRepository.add({
    attendee_id: attendeeId,
    event_id: 1,
    confirmation_hash: registrationConfirmationHash.toString(),
  });
}
