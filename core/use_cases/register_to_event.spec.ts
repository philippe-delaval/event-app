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
  it("rejects a first name that is too short", async () => {
    await addNextEvent();

    await expect(() =>
      registerToEvent({
        first_name: "F",
        last_name: "Doe",
      }),
    ).rejects.toThrow("First name must be between 1 and 250 characters long");
  });

  it("rejects a first name that is too long", async () => {
    await addNextEvent();

    const longName = "A".repeat(251);
    await expect(() =>
      registerToEvent({
        first_name: longName,
        last_name: "Doe",
      }),
    ).rejects.toThrow("First name must be between 1 and 250 characters long");
  });

  it("accepts a first name with valid special characters (hyphens and apostrophes...)", async () => {
    await addNextEvent();

    await expect(
      registerToEvent({
        first_name: "Anne-Marie",
        last_name: "Doe",
      }),
    ).resolves.not.toThrow();
  });

  it("rejects a first name containing special characters", async () => {
    await addNextEvent();

    await expect(() =>
      registerToEvent({
        first_name: "Bob@",
        last_name: "Doe",
      }),
    ).rejects.toThrow(
      "First name can only contain spaces, hyphens, and apostrophes",
    );
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

  it("rejects a first name with leading or trailing spaces", async () => {
    await addNextEvent();

    await expect(() =>
      registerToEvent({
        first_name: " Alice ",
        last_name: "Doe",
      }),
    ).rejects.toThrow("First name must not contain leading or trailing spaces");
  });

  it("rejects a first name containing only spaces", async () => {
    await addNextEvent();

    await expect(() =>
      registerToEvent({
        first_name: "    ",
        last_name: "Doe",
      }),
    ).rejects.toThrow("First name must not be only spaces");
  });

  it("rejects an attempt of SQL injection through the first name field", async () => {
    await addNextEvent();

    await expect(() =>
      registerToEvent({
        first_name: "Alice'; DROP TABLE attendees; --",
        last_name: "Doe",
      }),
    ).rejects.toThrow("Invalid input");
  });

  it("rejects an attempt of XSS attack through the first name field", async () => {
    await addNextEvent();

    await expect(() =>
      registerToEvent({
        first_name: "<script>alert('XSS')</script>",
        last_name: "Doe",
      }),
    ).rejects.toThrow("Invalid input");
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
