import { AppEventsRepository } from "../../repositories/app-events.repository";
import { AppEvent } from "../../models/app-event";

export async function getAllEventsUseCase(dependencies: {
  appEventsRepository: AppEventsRepository;
}): Promise<AppEvent[]> {
  return dependencies.appEventsRepository.findAllEvents();
}
