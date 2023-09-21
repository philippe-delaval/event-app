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
});

describe("First name field validation", () => {
  it("accepts a first name with a valid length", async () => {
    await addNextEvent();

    const promise = registerToEvent({
      first_name: "Foo",
      last_name: "Doe",
    });

    await expect(promise).resolves.not.toThrow();
  });

  it("accepts a first name with valid special characters (hyphens and apostrophes...)", async () => {
    await addNextEvent();

    await registerToEvent({
      first_name: "Anne-Marie",
      last_name: "Doe",
    });

    const attendeeResult = await knexClient("attendees").select("*");
    expect(attendeeResult[0].first_name).toEqual("Anne-Marie");
  });

  it("throws an error if the first name is missing", async () => {
    await addNextEvent();

    expect(() =>
      registerToEvent({
        first_name: "",
        last_name: "Bar",
      }),
    ).rejects.toThrow("First name is required");
  });

  it("throws an error if the first name contains numbers", async () => {
    await addNextEvent();

    expect(() =>
      registerToEvent({
        first_name: "Foo1",
        last_name: "Bar",
      }),
    ).rejects.toThrow("First name must have letters only");
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
