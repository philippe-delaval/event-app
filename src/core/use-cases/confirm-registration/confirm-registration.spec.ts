import { ConfirmRegistrationCommandDto } from "./confirm-registration.command";
import { confirmRegistrationUseCase } from "./confirm-registration.use-case";
import { getKnexClient } from "@/core/lib/knex.lib";
import { EmailSender } from "@/core/lib/email-sender.lib";
import { RegistrationsRepository } from "@/core/repositories/registrations.repository";
import { Knex } from "knex";

let knexClient: Knex;
let confirmRegistrationUseCaseTest: (
  command: ConfirmRegistrationCommandDto,
) => Promise<void>;
let emailSenderStub: EmailSender;

beforeAll(async () => {
  knexClient = getKnexClient();
  await knexClient.migrate.latest();

  const registrationsRepository = new RegistrationsRepository(knexClient);
  emailSenderStub = {
    send: vitest.fn(),
  } as unknown as EmailSender;

  confirmRegistrationUseCaseTest = (command: ConfirmRegistrationCommandDto) =>
    confirmRegistrationUseCase(
      { registrationsRepository, emailSender: emailSenderStub },
      command,
    );
});

afterEach(async () => {
  await knexClient("attendees").truncate();
  await knexClient("events").truncate();
  await knexClient("registrations").truncate();
});

it("confirms the registration", async () => {
  await givenARegisteredAttendeeToAnEvent();

  await confirmRegistrationUseCaseTest({
    confirmationToken: "ba6eb330-4f7f-11eb-a2fb-67c34e9ac07c",
  });

  const registrationResult = await knexClient("registrations")
    .select("confirmed")
    .where({
      confirmation_token: "ba6eb330-4f7f-11eb-a2fb-67c34e9ac07c",
    });
  expect(registrationResult).toEqual([
    {
      confirmed: 1,
    },
  ]);
});

it("sends a confirmation email", async () => {
  await givenARegisteredAttendeeToAnEvent();

  await confirmRegistrationUseCaseTest({
    confirmationToken: "ba6eb330-4f7f-11eb-a2fb-67c34e9ac07c",
  });

  expect(emailSenderStub.send).toHaveBeenCalledWith({
    to: "foo@bar.com",
    subject: "Confirmation de l'inscription",
    html: "<p>Votre inscription a bien été confirmée</p>",
  });
});

async function givenARegisteredAttendeeToAnEvent() {
  await knexClient("events").insert({
    id: 1,
    name: "Foo",
    description: "Bar",
    begin_date: new Date(),
  });
  await knexClient("attendees").insert({
    id: 1,
    first_name: "Foo",
    last_name: "Bar",
    email: "foo@bar.com",
  });
  await knexClient("registrations").insert({
    event_id: 1,
    attendee_id: 1,
    confirmation_token: "ba6eb330-4f7f-11eb-a2fb-67c34e9ac07c",
    confirmed: 0,
  });
}
