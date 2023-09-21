import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees_repository";
import { RegistrationsRepository } from "../repositories/registrations_repository";

export async function registerToEvent(query: RegisterQuery): Promise<void> {
  if (!query.first_name) {
    throw new Error("First name is required");
  }

  if (/\d/.test(query.first_name)) {
    throw new Error("First name must have letters only");
  }

  if (query.first_name.length < 2 || query.first_name.length > 250) {
    throw new Error("First name must be between 1 and 250 characters long");
  }

  if (
    !/^[a-zA-ZàáâäãåąćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĻŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð .'-]+$/u.test(
      query.first_name,
    )
  ) {
    throw new Error(
      "First name can only contain spaces, hyphens, and apostrophes",
    );
  }

  if (query.first_name !== query.first_name.trim()) {
    throw new Error("First name must not contain leading or trailing spaces");
  }

  const knexClient = await getKnexClient();

  const attendeesRepository = new AttendeesRepository(knexClient);
  const attendeeId = await attendeesRepository.add({
    first_name: query.first_name,
    last_name: query.last_name,
  });

  const registerRepository = new RegistrationsRepository(knexClient);
  await registerRepository.add(1, attendeeId);
}

export interface RegisterQuery {
  last_name: string;
  first_name: string;
}
