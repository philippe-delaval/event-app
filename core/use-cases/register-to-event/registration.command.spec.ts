import { ZodError } from "zod";
import { RegistrationCommand } from "./registration.command";

describe("First name field validation", () => {
  it("rejects a first name that is too short", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "F",
          lastName: "Doe",
        })
    ).toThrow(ZodError);
  });

  it("rejects a first name that is too long", () => {
    const longName = "A".repeat(251);

    expect(
      () =>
        new RegistrationCommand({
          firstName: longName,
          lastName: "Doe",
        })
    ).toThrow(ZodError);
  });

  it("accepts a first name with valid special characters (hyphens and apostrophes...)", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Anne-Marie",
          lastName: "Doe",
        })
    ).not.toThrow();
  });

  it("rejects a first name containing special characters", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Bob@",
          lastName: "Doe",
        })
    ).toThrow(ZodError);
  });

  it("rejects when the first name is missing", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "",
          lastName: "Bar",
        })
    ).toThrow(ZodError);
  });

  it("rejects when the first name contains numbers", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Foo1",
          lastName: "Bar",
        })
    ).toThrow(ZodError);
  });

  it("validates when the first name contains spaces around", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: " Foo ",
          lastName: "Bar",
        })
    ).not.toThrow();
  });
});

describe("Last name field validation", () => {
  it("rejects a last name that is too short", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Foo",
          lastName: "D",
        })
    ).toThrow(ZodError);
  });

  it("rejects a last name that is too long", () => {
    const longName = "A".repeat(251);

    expect(
      () =>
        new RegistrationCommand({
          firstName: "Foo",
          lastName: longName,
        })
    ).toThrow(ZodError);
  });

  it("accepts a last name with valid special characters (hyphens and apostrophes...)", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Anne-Marie",
          lastName: "De-la-Villardière",
        })
    ).not.toThrow();
  });

  it("rejects a last name containing special characters", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Bob",
          lastName: "Doe@",
        })
    ).toThrow(ZodError);
  });

  it("rejects when the last name is missing", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Foo",
          lastName: "",
        })
    ).toThrow(ZodError);
  });

  it("rejects when the last name contains numbers", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Foo",
          lastName: "Bar1",
        })
    ).toThrow(ZodError);
  });

  it("validates when the last name contains spaces around", () => {
    expect(
      () =>
        new RegistrationCommand({
          firstName: "Foo",
          lastName: " Bar ",
        })
    ).not.toThrow();
  });
});
