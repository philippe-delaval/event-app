import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees-repository";
import { RegistrationsRepository } from "../repositories/registrations-repository";

export async function registerToEvent(query: RegistrationQuery): Promise<void> {
  const satinitizedFirstName = satinizeFirstName(query.firstName);
  validateFirstName(satinitizedFirstName);

  await registerAttendee(query);
}

function satinizeFirstName(firstName: string) {
  return firstName.trim();
}

function validateFirstName(firstName: string) {
  if (!firstName) {
    throw new Error("First name is required");
  }

  if (/\d/.test(firstName)) {
    throw new Error("First name must have letters only");
  }

  if (firstName.length < 2 || firstName.length > 250) {
    throw new Error("First name must be between 1 and 250 characters long");
  }

  if (
    !/^[a-zA-ZàáâäãåąćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĻŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð .'-]+$/u.test(
      firstName
    )
  ) {
    throw new Error(
      "First name can only contain spaces, hyphens, and apostrophes"
    );
  }
}

async function registerAttendee(query: RegistrationQuery) {
  const knexClient = await getKnexClient();

  const attendeesRepository = new AttendeesRepository(knexClient);
  const attendeeId = await attendeesRepository.add({
    first_name: query.firstName,
    last_name: query.lastName,
  });

  const registerRepository = new RegistrationsRepository(knexClient);
  await registerRepository.add(1, attendeeId);
}

export interface RegistrationQuery {
  lastName: string;
  firstName: string;
}
