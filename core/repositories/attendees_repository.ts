import { Knex } from "knex";

export class AttendeesRepository {
  constructor(private readonly knexClient: Knex) {}

  async add({
    first_name,
    last_name,
  }: {
    first_name: string;
    last_name: string;
  }): Promise<void> {
    await this.knexClient("attendees").insert({
      first_name,
      last_name,
    });
  }
}
