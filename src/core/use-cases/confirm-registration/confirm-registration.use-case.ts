import { EmailSender } from "@/core/lib/email-sender.lib";
import {
  ConfirmRegistrationCommand,
  ConfirmRegistrationCommandDto,
} from "./confirm-registration.command";

export async function confirmRegistrationUseCase(
  dependencies: {
    emailSender: EmailSender;
  },
  commandDto: ConfirmRegistrationCommandDto,
): Promise<void> {
  const command = new ConfirmRegistrationCommand(commandDto);
}
