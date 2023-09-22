import { Knex } from "knex";
import { getKnexClient } from "@/core/lib/knex";
import { ZodError } from "zod";
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

  describe("First name field validation", () => {
    it("rejects a first name that is too short", async () => {
      await addNextEvent();

      await expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "F",
          lastName: "Doe",
        })
      ).rejects.toThrow(ZodError);
    });

    it("rejects a first name that is too long", async () => {
      await addNextEvent();

      const longName = "A".repeat(251);

      await expect(() =>
        CoreUseCases.registerToEvent({
          firstName: longName,
          lastName: "Doe",
        })
      ).rejects.toThrow(ZodError);
    });

    it("accepts a first name with valid special characters (hyphens and apostrophes...)", async () => {
      await addNextEvent();

      await expect(
        CoreUseCases.registerToEvent({
          firstName: "Anne-Marie",
          lastName: "Doe",
        })
      ).resolves.not.toThrow();
    });

    it("rejects a first name containing special characters", async () => {
      await addNextEvent();

      await expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "Bob@",
          lastName: "Doe",
        })
      ).rejects.toThrow(ZodError);
    });

    it("rejects when the first name is missing", async () => {
      await addNextEvent();

      expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "",
          lastName: "Bar",
        })
      ).rejects.toThrow(ZodError);
    });

    it("rejects when the first name contains numbers", async () => {
      await addNextEvent();

      expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "Foo1",
          lastName: "Bar",
        })
      ).rejects.toThrow(ZodError);
    });

    it("validates when the first name contains spaces around", async () => {
      await addNextEvent();

      await expect(
        CoreUseCases.registerToEvent({
          firstName: " Foo ",
          lastName: "Bar",
        })
      ).resolves.not.toThrow();
    });
  });

  describe("Last name field validation", () => {
    it("rejects a last name that is too short", async () => {
      await addNextEvent();

      await expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "Foo",
          lastName: "D",
        })
      ).rejects.toThrow(ZodError);
    });

    it("rejects a last name that is too long", async () => {
      await addNextEvent();

      const longName = "A".repeat(251);

      await expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "Foo",
          lastName: longName,
        })
      ).rejects.toThrow(ZodError);
    });

    it("accepts a last name with valid special characters (hyphens and apostrophes...)", async () => {
      await addNextEvent();

      await expect(
        CoreUseCases.registerToEvent({
          firstName: "Anne-Marie",
          lastName: "De-la-Villardière",
        })
      ).resolves.not.toThrow();
    });

    it("rejects a last name containing special characters", async () => {
      await addNextEvent();

      await expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "Bob",
          lastName: "Doe@",
        })
      ).rejects.toThrow(ZodError);
    });

    it("rejects when the last name is missing", async () => {
      await addNextEvent();

      expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "Foo",
          lastName: "",
        })
      ).rejects.toThrow(ZodError);
    });

    it("rejects when the last name contains numbers", async () => {
      await addNextEvent();

      expect(() =>
        CoreUseCases.registerToEvent({
          firstName: "Foo",
          lastName: "Bar1",
        })
      ).rejects.toThrow(ZodError);
    });

    it("validates when the last name contains spaces around", async () => {
      await addNextEvent();

      await expect(
        CoreUseCases.registerToEvent({
          firstName: "Foo",
          lastName: " Bar ",
        })
      ).resolves.not.toThrow();
    });
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
