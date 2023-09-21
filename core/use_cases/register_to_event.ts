import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees_repository";
import { RegistrationsRepository } from "../repositories/registrations_repository";

export async function registerToEvent(query: RegisterQuery): Promise<void> {
  const first_name = query.first_name.trim();

  if (!first_name) {
    throw new Error("First name is required");
  }

  if (/\d/.test(first_name)) {
    throw new Error("First name must have letters only");
  }

  if (first_name.length < 2 || first_name.length > 250) {
    throw new Error("First name must be between 1 and 250 characters long");
  }

  if (
    !/^[a-zA-ZàáâäãåąćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĻŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð .'-]+$/u.test(
      first_name
    )
  ) {
    throw new Error(
      "First name can only contain spaces, hyphens, and apostrophes"
    );
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
