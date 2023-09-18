import { Knex } from "knex";
import { subscribeToEvent } from "./subscribe_to_event";
import { makeTestKnexClient } from "../lib/knex";

let knexClient: Knex;

beforeEach(async () => {
  knexClient = await makeTestKnexClient();
});

afterEach(async () => {
  await knexClient.destroy();
});

it("subscribes to event", async () => {
  // Given
  await knexClient("events").insert({
    id: 1,
    name: "Test Event",
    description: "Test Description",
    begin_date: new Date(),
  });

  // When
  await subscribeToEvent({
    first_name: "Foo",
    last_name: "Bar",
  });

  // Then
  const subscriptionResult = await knexClient()
    .select("*")
    .from("attendees, subscriptions")
    .where("attendees.id", "subscriptions.attendee_id");

  expect(subscriptionResult).toEqual([
    {
      id: 1,
      first_name: "Foo",
      last_name: "Bar",
      event_id: 1,
      attendee_id: 1,
    },
  ]);
});

it("validates the attendee's first name", async () => {
  expect(
    await subscribeToEvent({
      first_name: "123",
      last_name: "Bar",
    })
  ).toThrowError("Invalid first name");
});
