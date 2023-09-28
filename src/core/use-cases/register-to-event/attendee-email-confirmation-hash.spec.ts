import { AttendeeEmailConfirmationHash } from "./attendee-email-confirmation-hash";

it("generates a hash from the attendee email that is not the attendee email", () => {
  const attendeeEmail = "toto@titi.fr";

  const hash = new AttendeeEmailConfirmationHash(attendeeEmail);

  expect(hash.toString()).not.toBe(attendeeEmail);
});

it("generates a hash with a length of 60", () => {
  const attendeeEmail = "toto@titi.fr";

  const hash = new AttendeeEmailConfirmationHash(attendeeEmail);

  expect(hash.toString()).toHaveLength(60);
});

it("generates a hash that is different from another attendee email hash", () => {
  const attendeeEmail = "toto@titi.fr";
  const anotherAttendeeEmail = "toto@tata.fr";

  const hash = new AttendeeEmailConfirmationHash(attendeeEmail);
  const anotherHash = new AttendeeEmailConfirmationHash(anotherAttendeeEmail);

  expect(hash.toString()).not.toBe(anotherHash.toString());
});
