import { Knex } from "knex";
import { registerToEvent } from "./register_to_event";
import { getKnexClient } from "../lib/knex";

let knexClient: Knex;

beforeAll(async () => {
  knexClient = await getKnexClient();
});

afterEach(async () => {
  await knexClient("attendees").truncate();
  await knexClient("events").truncate();
  await knexClient("registrations").truncate();
});

afterAll(async () => {
  await knexClient.destroy();
});

describe("when an attendee registers for an event", () => {
  it("registers a new attendee", async () => {
    await addNextEvent();

    await registerToEvent({
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

  it("adds a new register", async () => {
    await addNextEvent();

    await registerToEvent({
      first_name: "Foo",
      last_name: "Bar",
    });

    const registerResult = await knexClient("registrations").select("*");
    expect(registerResult).toEqual([
      {
        event_id: 1,
        attendee_id: 1,
      },
    ]);
  });

  it("can add multiple attendees to the same event", async () => {
    await addNextEvent();

    await registerToEvent({
      first_name: "Foo",
      last_name: "Bar",
    });
    await registerToEvent({
      first_name: "Foo",
      last_name: "Bar",
    });

    const registerResult = await knexClient("registrations").select("*");
    expect(registerResult).toEqual([
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

  it("throws an error if the first name is missing", async () => {
    await addNextEvent();

    expect(() =>
      registerToEvent({
        first_name: "",
        last_name: "Bar",
      })
    ).rejects.toThrow("First name is required");
  });
});

async function addNextEvent() {
  await knexClient("events").insert({
    id: 1,
    name: "Test Event",
    description: "Test Description",
    begin_date: new Date(),
  });
}
