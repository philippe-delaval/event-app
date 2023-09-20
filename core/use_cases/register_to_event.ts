import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees_repository";
import { RegisterRepository } from "../repositories/register_repository";

export async function registerToEvent(query: RegisterQuery): Promise<void> {
  const knexClient = await getKnexClient();

  const attendeesRepository = new AttendeesRepository(knexClient);
  const attendeeId = await attendeesRepository.add({
    first_name: query.first_name,
    last_name: query.last_name,
  });

  const registerRepository = new RegisterRepository(knexClient);
  await registerRepository.add(1, attendeeId);
}

export interface RegisterQuery {
  last_name: string;
  first_name: string;
}
