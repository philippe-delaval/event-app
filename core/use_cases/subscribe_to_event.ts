import { getKnexClient } from "../lib/knex";
import { AttendeesRepository } from "../repositories/attendees_repository";
import { SubscriptionsRepository } from "../repositories/subscriptions_repository";

export async function subscribeToEvent(
  query: SubscriptionQuery
): Promise<void> {
  const knexClient = await getKnexClient();

  const attendeesRepository = new AttendeesRepository(knexClient);
  await attendeesRepository.add({
    first_name: query.first_name,
    last_name: query.last_name,
  });

  const subscriptionsRepository = new SubscriptionsRepository(knexClient);
  await subscriptionsRepository.add(1, 1);
}

export interface SubscriptionQuery {
  last_name: string;
  first_name: string;
}
