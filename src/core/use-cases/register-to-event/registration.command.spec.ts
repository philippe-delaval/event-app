import { ZodError } from "zod";
import { RegistrationCommand } from "./registration.command";

describe("RegistrationCommand validation", () => {
  const validFirstNames = ["John", "Anne-Marie"];

  const invalidFirstNames = [
    { name: "F", reason: "too short" },
    { name: "A".repeat(251), reason: "too long" },
    { name: "Bob@", reason: "invalid characters" },
    { name: "", reason: "empty" },
    { name: "Foo1", reason: "contains numbers" },
  ];

  const validLastNames = ["Doe", "De-la-Villardière"];

  const invalidLastNames = [
    { name: "D", reason: "too short" },
    { name: "A".repeat(251), reason: "too long" },
    { name: "Doe@", reason: "invalid characters" },
    { name: "", reason: "empty" },
    { name: "Bar1", reason: "contains numbers" },
  ];

  describe("First name validations", () => {
    test.each(validFirstNames)(
      "accepts a valid first name like %p",
      (firstName) => {
        expect(
          () =>
            new RegistrationCommand({
              firstName,
              lastName: "Doe",
            })
        ).not.toThrow();
      }
    );

    test.each(invalidFirstNames)("rejects a first name %p", ({ name }) => {
      expect(
        () =>
          new RegistrationCommand({
            firstName: name,
            lastName: "Doe",
          })
      ).toThrow(ZodError);
    });
  });

  describe("Last name validations", () => {
    test.each(validLastNames)(
      "accepts a valid last name like %p",
      (lastName) => {
        expect(
          () =>
            new RegistrationCommand({
              firstName: "John",
              lastName,
            })
        ).not.toThrow();
      }
    );

    test.each(invalidLastNames)("rejects a last name %p", ({ name }) => {
      expect(
        () =>
          new RegistrationCommand({
            firstName: "John",
            lastName: name,
          })
      ).toThrow(ZodError);
    });
  });
});
