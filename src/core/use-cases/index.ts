import { EmailSender } from "../lib/email-sender.lib";
import { CoreRepositoriesLive } from "../repositories";
import { ConfirmRegistrationCommandDto } from "./confirm-registration/confirm-registration.command";
import { confirmRegistrationUseCase } from "./confirm-registration/confirm-registration.use-case";
import { getNextAppEventUseCase } from "./get-next-app-event.use-case";
import { getPastAppEventsUseCase } from "./get-past-app-events.use-case";
import { sendContactEmailUseCase } from "./send-contact-email.use-case";
import { loginUseCase } from "./auth/login.use-case";
import { registerToEventUseCase } from "./register-to-event/register-to-event.use-case";
import { getDashboardStatsUseCase } from "./dashboard/get-dashboard-stats.use-case";
import { RegistrationCommandDto } from "./register-to-event/registration.command";
import { getAllUsersUseCase } from "./users/get-all-users.use-case";
import { getAllEventsUseCase } from "./events/get-all-events.use-case";

const emailSender = new EmailSender();

export const CoreUseCasesLive = {
  getNextAppEvent: () =>
    getNextAppEventUseCase({
      appEventsRepository: CoreRepositoriesLive.appEventsRepository,
    }),
  getPastAppEvents: () =>
    getPastAppEventsUseCase({
      appEventsRepository: CoreRepositoriesLive.appEventsRepository,
    }),
  registerToEvent: (commandDto: RegistrationCommandDto) =>
    registerToEventUseCase(
      {
        attendeesRepository: CoreRepositoriesLive.attendeesRepository,
        registrationsRepository: CoreRepositoriesLive.registrationsRepository,
        emailSender,
      },
      commandDto,
    ),
  confirmRegistration: (commandDto: ConfirmRegistrationCommandDto) =>
    confirmRegistrationUseCase(
      {
        registrationsRepository: CoreRepositoriesLive.registrationsRepository,
        emailSender,
      },
      commandDto,
    ),
  sendContactEmail: (params: {
    firstname: string;
    lastname: string;
    email: string;
    message: string;
  }) =>
    sendContactEmailUseCase(
      {
        emailSender,
      },
      params,
    ),
  login: (params: { email: string; password: string }) =>
    loginUseCase(
      {
        authRepository: CoreRepositoriesLive.authRepository,
      },
      params,
    ),
  getDashboardStats: () =>
    getDashboardStatsUseCase({
      appEventsRepository: CoreRepositoriesLive.appEventsRepository,
      registrationsRepository: CoreRepositoriesLive.registrationsRepository,
    }),
  getAllUsers: () =>
    getAllUsersUseCase({
      authRepository: CoreRepositoriesLive.authRepository,
    }),
  getAllEvents: () =>
    getAllEventsUseCase({
      appEventsRepository: CoreRepositoriesLive.appEventsRepository,
    }),
  getParticipants: () =>
    CoreRepositoriesLive.registrationsRepository.findAllWithAttendees(),
};
