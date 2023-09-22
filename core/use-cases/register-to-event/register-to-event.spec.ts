import { Knex } from "knex";
import { getKnexClient } from "@/core/lib/knex";
import { CoreUseCases } from "..";

let knexClient: Knex;

beforeAll(async () => {
  knexClient = await getKnexClient();
  await knexClient.migrate.latest();
});

afterEach(async () => {
  await knexClient("attendees").truncate();
  await knexClient("events").truncate();
  await knexClient("registrations").truncate();
});

afterAll(async () => {
  await knexClient.destroy();
});

describe("When an attendee registers for an event", () => {
  it("registers a new attendee", async () => {
    await addNextEvent();

    await CoreUseCases.registerToEvent({
      firstName: "Foo",
      lastName: "Bar",
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

  it("adds a new registration", async () => {
    await addNextEvent();

    await CoreUseCases.registerToEvent({
      firstName: "Foo",
      lastName: "Bar",
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

    await CoreUseCases.registerToEvent({
      firstName: "Foo",
      lastName: "Bar",
    });
    await CoreUseCases.registerToEvent({
      firstName: "Foo",
      lastName: "Bar",
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

async function addNextEvent() {
  await knexClient("events").insert({
    id: 1,
    name: "Test Event",
    description: "Test Description",
    begin_date: new Date(),
  });
}
