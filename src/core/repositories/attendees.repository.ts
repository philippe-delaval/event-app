import { Knex } from "knex";
import { Attendee } from "../models/attendee";

export class AttendeesRepository {
  constructor(private readonly knex: Knex) {}

  async add({
    first_name,
    last_name,
    email,
    job_title,
    company,
    marketing_consent,
  }: {
    first_name: string;
    last_name: string;
    email: string;
    job_title?: string;
    company?: string;
    marketing_consent?: boolean;
  }): Promise<number> {
    const attendeeIds = await this.knex("attendees")
      .insert({
        first_name,
        last_name,
        email,
        job_title,
        company,
        marketing_consent,
      })
      .returning("id");

    return attendeeIds[0].id;
  }

  async findByEmail(email: string): Promise<Attendee | null> {
    const attendeeResult = await this.knex<Attendee>("attendees")
      .select("id", "first_name", "last_name", "email")
      .where("email", "=", email)
      .first();

    return attendeeResult ?? null;
  }
}
