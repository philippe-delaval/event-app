import { Knex } from "knex";
import { getKnexClient } from "@/core/lib/knex.lib";
import { registerToEventUseCase } from "./register-to-event.use-case";
import { AttendeesRepository } from "@/core/repositories/attendees.repository";
import { RegistrationsRepository } from "@/core/repositories/registrations.repository";
import { RegistrationCommandDto } from "./registration.command";
import { EmailSender } from "@/core/lib/email-sender.lib";
import { AttendeeEmailAlreadyRegisteredError } from "./attendee-email-already-registered.error";

let knexClient: Knex;
let emailSenderStub: EmailSender;
let registerToEventUseCaseTest: (
  command: RegistrationCommandDto,
) => Promise<void>;

beforeAll(async () => {
  knexClient = getKnexClient();
  await knexClient.migrate.latest();
  emailSenderStub = {
    send: vitest.fn(),
  } as unknown as EmailSender;

  registerToEventUseCaseTest = (command: RegistrationCommandDto) =>
    registerToEventUseCase(
      {
        attendeesRepository: new AttendeesRepository(knexClient),
        registrationsRepository: new RegistrationsRepository(knexClient),
        emailSender: emailSenderStub,
      },
      command,
    );
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
  beforeEach(async () => {
    await addNextEvent();
  });

  it("registers a new attendee", async () => {
    await registerToEventUseCaseTest({
      firstName: "Foo",
      lastName: "Bar",
      email: "toto@titi.fr",
    });

    const attendeeResult = await knexClient("attendees").select("*");
    expect(attendeeResult).toEqual([
      {
        id: 1,
        first_name: "Foo",
        last_name: "Bar",
        email: "toto@titi.fr",
      },
    ]);
  });

  it("adds a new registration", async () => {
    await registerToEventUseCaseTest({
      firstName: "Foo",
      lastName: "Bar",
      email: "toto@titi.fr",
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
    await registerToEventUseCaseTest({
      firstName: "Foo",
      lastName: "Bar",
      email: "toto@titi.fr",
    });
    await registerToEventUseCaseTest({
      firstName: "Paul",
      lastName: "Sucre",
      email: "paul@sucre.fr",
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

  it("fails to register an attendee if the email is already registered", async () => {
    await registerToEventUseCaseTest({
      firstName: "Foo",
      lastName: "Bar",
      email: "toto@titi.fr",
    });

    expect(() =>
      registerToEventUseCaseTest({
        firstName: "Foo",
        lastName: "Bar",
        email: "toto@titi.fr",
      }),
    ).rejects.toThrow(AttendeeEmailAlreadyRegisteredError);
  });

  it("sends a confirmation email", async () => {
    const attendeeEmail = "toto@titi.fr";

    await registerToEventUseCaseTest({
      firstName: "Foo",
      lastName: "Bar",
      email: attendeeEmail,
    });

    expect(emailSenderStub.send).toHaveBeenCalledWith({
      to: attendeeEmail,
      subject: "Confirmation inscription",
      text: "Merci pour votre inscription !",
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
