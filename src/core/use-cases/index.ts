import { CoreRepositories } from "../repositories";
import { getNextAppEventUseCase } from "./get-next-app-event.use-case";
import { registerToEventUseCase } from "./register-to-event/register-to-event.use-case";
import { RegistrationCommandDto } from "./register-to-event/registration.command";

export const CoreUseCases = {
  getNextAppEvent: () =>
    getNextAppEventUseCase({
      appEventsRepository: CoreRepositories.appEventsRepository,
    }),
  registerToEvent: (commandDto: RegistrationCommandDto) =>
    registerToEventUseCase(
      {
        attendeesRepository: CoreRepositories.attendeesRepository,
        registrationsRepository: CoreRepositories.registrationsRepository,
      },
      commandDto
    ),
};
