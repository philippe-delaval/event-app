import { EmailSender } from "../lib/email-sender.lib";
import { CoreRepositoriesLive } from "../repositories";
import { getNextAppEventUseCase } from "./get-next-app-event.use-case";
import { registerToEventUseCase } from "./register-to-event/register-to-event.use-case";
import { RegistrationCommandDto } from "./register-to-event/registration.command";

export const CoreUseCasesLive = {
  getNextAppEvent: () =>
    getNextAppEventUseCase({
      appEventsRepository: CoreRepositoriesLive.appEventsRepository,
    }),
  registerToEvent: (commandDto: RegistrationCommandDto) =>
    registerToEventUseCase(
      {
        attendeesRepository: CoreRepositoriesLive.attendeesRepository,
        registrationsRepository: CoreRepositoriesLive.registrationsRepository,
        emailSender: new EmailSender(),
      },
      commandDto,
    ),
};
