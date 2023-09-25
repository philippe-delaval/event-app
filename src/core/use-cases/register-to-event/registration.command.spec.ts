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

  const validEmail = "toto@titi.fr"

  describe("First name validation", () => {
    test.each(validFirstNames)(
      "accepts a valid first name like %p",
      (firstName) => {
        expect(
          () =>
            new RegistrationCommand({
              firstName,
              lastName: "Doe",
              email: validEmail,
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
            email: validEmail,
          })
      ).toThrow(ZodError);
    });
  });

  describe("Last name validation", () => {
    test.each(validLastNames)(
      "accepts a valid last name like %p",
      (lastName) => {
        expect(
          () =>
            new RegistrationCommand({
              firstName: "John",
              lastName,
              email: validEmail,
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
            email: validEmail,
          })
      ).toThrow(ZodError);
    });
  });

  describe("Email validation", () => {
    it("accepts a valid email", () => {
      expect(
          () =>
            new RegistrationCommand({
              firstName: "John",
              lastName: "Doe",
              email: validEmail,
            })
        ).not.toThrow();
    } )
  })
});
