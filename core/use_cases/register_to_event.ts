import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees_repository";
import { RegistrationsRepository } from "../repositories/registrations_repository";
import { validateFirstName } from "./validateFirstName";

export async function registerToEvent(query: RegistrationQuery): Promise<void> {
  const satinitizedFirstName = satinizeFirstName(query.first_name);
  validateFirstName(satinitizedFirstName);

  await registerAttendee(query);
}

function satinizeFirstName(firstName: string) {
  return firstName.trim();
}

async function registerAttendee(query: RegistrationQuery) {
  const knexClient = await getKnexClient();

  const attendeesRepository = new AttendeesRepository(knexClient);
  const attendeeId = await attendeesRepository.add({
    first_name: query.first_name,
    last_name: query.last_name,
  });

  const registerRepository = new RegistrationsRepository(knexClient);
  await registerRepository.add(1, attendeeId);
}

export interface RegistrationQuery {
  last_name: string;
  first_name: string;
}
