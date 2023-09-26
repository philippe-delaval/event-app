import { Knex } from "knex";

export class AttendeesRepository {
  constructor(private readonly knex: Knex) {}

  async add({
    first_name,
    last_name,
    email,
  }: {
    first_name: string;
    last_name: string;
    email: string;
  }): Promise<number> {
    const attendeeWithWantedEmail = await this.knex("attendees")
      .select("id")
      .where("email", "=", email);
    if (attendeeWithWantedEmail.length > 0) {
      throw new Error("Email already registered");
    }

    const attendeeIds = await this.knex("attendees")
      .insert({
        first_name,
        last_name,
        email,
      })
      .returning("id");

    return attendeeIds[0].id;
  }
}
