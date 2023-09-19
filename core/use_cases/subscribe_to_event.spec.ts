import { Knex } from "knex";
import { subscribeToEvent } from "./subscribe_to_event";
import { getKnexClient } from "../lib/knex";
import { after } from "node:test";

let knexClient: Knex;

beforeAll(async () => {
  knexClient = await getKnexClient();
});

afterEach(async () => {
  await knexClient.delete().from("attendees");
  await knexClient.delete().from("events");
  await knexClient.delete().from("subscriptions");
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

async function addNextEvent() {
  await knexClient("events").insert({
    id: 1,
    name: "Test Event",
    description: "Test Description",
    begin_date: new Date(),
  });
}
