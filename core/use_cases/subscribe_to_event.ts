import { getKnexClient } from "../lib/knex";

export async function subscribeToEvent(
  query: SubscriptionQuery
): Promise<void> {
  const knexClient = await getKnexClient();

  await knexClient("attendees").insert({
    first_name: query.first_name,
    last_name: query.last_name,
  });

  await knexClient("subscriptions").insert({
    event_id: 1,
    attendee_id: 1,
  });
}

export interface SubscriptionQuery {
  last_name: string;
  first_name: string;
}
