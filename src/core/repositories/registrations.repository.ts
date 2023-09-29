import { Knex } from "knex";
import { Attendee } from "../models/attendee";

export class RegistrationsRepository {
  constructor(private readonly knex: Knex) {}

  async add(fields: {
    event_id: number;
    attendee_id: number;
    confirmation_token: string;
  }): Promise<void> {
    await this.knex("registrations").insert(fields);
  }

  async confirmRegistration(confirmationToken: string): Promise<void> {
    await this.knex("registrations")
      .where({
        confirmation_token: confirmationToken,
      })
      .update({
        confirmed: 1,
      });
  }

  async getAttendeeByConfirmationToken(
    confirmationToken: string,
  ): Promise<Attendee> {
    const attendeeResult = await this.knex("registrations")
      .join("attendees", "attendees.id", "=", "registrations.attendee_id")
      .where({
        "registrations.confirmation_token": confirmationToken,
      })
      .select("attendees.*");

    return attendeeResult[0];
  }
}
