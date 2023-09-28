import { Knex } from "knex";

export class RegistrationsRepository {
  constructor(private readonly knex: Knex) {}

  async add(fields: {
    event_id: number;
    attendee_id: number;
    confirmation_token: string;
  }): Promise<void> {
    await this.knex("registrations").insert(fields);
  }
}
