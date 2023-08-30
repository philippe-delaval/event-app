import { AppEvent } from "../entities/app_event";
import { makeKnexClient } from "../lib/knex";
import { AppEventsRepository } from "../repositories/app_events_repository";

const knexClient = makeKnexClient();

export async function getNextAppEvent(): Promise<AppEvent> {
  const appEventsRepository = new AppEventsRepository(knexClient);
  return appEventsRepository.getNextAppEvent();
}
