import { Knex } from "knex";

export class RegisterRepository {
  constructor(private readonly knex: Knex) {}

  async add(eventId: number, attendeeId: number): Promise<void> {
    await this.knex("registrations").insert({
      event_id: eventId,
      attendee_id: attendeeId,
    });
  }
}
