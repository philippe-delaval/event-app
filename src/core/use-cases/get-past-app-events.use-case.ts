import { AppEvent } from "../models/app-event";
import { AppEventsRepository } from "../repositories/app-events.repository";

export async function getPastAppEventsUseCase(dependencies: {
  appEventsRepository: AppEventsRepository;
}): Promise<AppEvent[]> {
  return dependencies.appEventsRepository.findPastAppEvents();
}
