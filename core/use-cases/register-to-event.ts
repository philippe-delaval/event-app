import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees-repository";
import { RegistrationsRepository } from "../repositories/registrations-repository";

export async function registerToEvent(
  command: RegistrationCommand
): Promise<void> {
  const satinitizedFirstName = satinizeFirstName(command.firstName);
  validateFirstName(satinitizedFirstName);

  await registerAttendee({
    firstName: satinitizedFirstName,
    lastName: command.lastName,
  });
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

async function registerAttendee(command: RegistrationCommand) {
  const knexClient = await getKnexClient();

  const attendeesRepository = new AttendeesRepository(knexClient);
  const attendeeId = await attendeesRepository.add({
    first_name: command.firstName,
    last_name: command.lastName,
  });

  const registerRepository = new RegistrationsRepository(knexClient);
  await registerRepository.add(1, attendeeId);
}

export interface RegistrationCommand {
  lastName: string;
  firstName: string;
}
