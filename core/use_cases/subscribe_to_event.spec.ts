import { Knex } from "knex";
import { subscribeToEvent } from "./subscribe_to_event";
import { getKnexClient } from "../lib/knex";

let knexClient: Knex;

beforeAll(async () => {
  knexClient = await getKnexClient();
});

afterEach(async () => {
  await knexClient("attendees").truncate();
  await knexClient("events").truncate();
  await knexClient("subscriptions").truncate();
});

afterAll(async () => {
  await knexClient.destroy();
});

it("registers a new attendee", async () => {
  await addNextEvent();

  await subscribeToEvent({
    first_name: "Foo",
    last_name: "Bar",
  });

  const attendeeResult = await knexClient("attendees").select("*");
  expect(attendeeResult).toEqual([
    {
      id: 1,
      first_name: "Foo",
      last_name: "Bar",
    },
  ]);
});

it("adds a new subscription", async () => {
  await addNextEvent();

  await subscribeToEvent({
    first_name: "Foo",
    last_name: "Bar",
  });

  const subscriptionResult = await knexClient("subscriptions").select("*");
  expect(subscriptionResult).toEqual([
    {
      event_id: 1,
      attendee_id: 1,
    },
  ]);
});

it("can add multiple attendees to the same event", async () => {
  await addNextEvent();

  await subscribeToEvent({
    first_name: "Foo",
    last_name: "Bar",
  });
  await subscribeToEvent({
    first_name: "Foo",
    last_name: "Bar",
  });

  const subscriptionResult = await knexClient("subscriptions").select("*");
  expect(subscriptionResult).toEqual([
    {
      event_id: 1,
      attendee_id: 1,
    },
    {
      event_id: 1,
      attendee_id: 2,
    },
  ]);
});

async function addNextEvent() {
  await knexClient("events").insert({
    id: 1,
    name: "Test Event",
    description: "Test Description",
    begin_date: new Date(),
  });
}
