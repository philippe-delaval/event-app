export class SubscriptionsRepository {
  constructor(private readonly knexClient: Knex) {}

  async add(eventId: number, attendeeId: number): Promise<void> {
    await this.knexClient("subscriptions").insert({
      event_id: eventId,
      attendee_id: attendeeId,
    });
  }
}
