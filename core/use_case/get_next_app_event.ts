import { AppEvent } from "../models/app_event";
import { makeKnexClient } from "../lib/knex";
import { AppEventsRepository } from "../repositories/app_events_repository";

const knexClient = makeKnexClient();

export async function getNextAppEvent(): Promise<AppEvent> {
  const appEventsRepository = new AppEventsRepository(knexClient);
  const appEvent = await appEventsRepository.findNextAppEvent();
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
