import { Knex } from "knex";

export class SubscriptionsRepository {
  constructor(private readonly knex: Knex) {}

  async add(eventId: number, attendeeId: number): Promise<void> {
    await this.knex("subscriptions").insert({
      event_id: eventId,
      attendee_id: attendeeId,
    });
  }
}
