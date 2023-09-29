import { EmailSender } from "@/core/lib/email-sender.lib";
import {
  ConfirmRegistrationCommand,
  ConfirmRegistrationCommandDto,
} from "./confirm-registration.command";
import { RegistrationsRepository } from "@/core/repositories/registrations.repository";

export async function confirmRegistrationUseCase(
  dependencies: {
    registrationsRepository: RegistrationsRepository;
    emailSender: EmailSender;
  },
  commandDto: ConfirmRegistrationCommandDto,
): Promise<void> {
  const command = new ConfirmRegistrationCommand(commandDto);

  const { registrationsRepository, emailSender } = dependencies;

  await registrationsRepository.confirmRegistration(command.confirmationToken);

  const attendee = await registrationsRepository.getAttendeeByConfirmationToken(
    command.confirmationToken,
  );

  await emailSender.send({
    to: attendee.email,
    subject: "Confirmation de l'inscription",
    html: "<p>Votre inscription a bien été confirmée</p>",
  });
}
