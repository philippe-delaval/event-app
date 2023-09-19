import { Knex } from "knex";

export class AttendeesRepository {
  constructor(private readonly knex: Knex) {}
  async add({
    first_name,
    last_name,
  }: {
    first_name: string;
    last_name: string;
  }): Promise<number> {
    const attendeeIds = await this.knex("attendees")
      .insert({
        first_name,
        last_name,
      })
      .returning("id");

    return attendeeIds[0].id;
  }
}
