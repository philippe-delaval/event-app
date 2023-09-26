import { AppEvent } from "../models/app-event";
import { AppEventsRepository } from "../repositories/app-events.repository";

export async function getNextAppEventUseCase(dependencies: {
  appEventsRepository: AppEventsRepository;
}): Promise<AppEvent> {
  const appEvent = await dependencies.appEventsRepository.findNextAppEvent();

  if (!appEvent) {
    throw new NextAppEventNotFoundError();
  }

  return appEvent;
}

export class NextAppEventNotFoundError extends Error {
  constructor() {
    super("Next app event not found");
  }
}
