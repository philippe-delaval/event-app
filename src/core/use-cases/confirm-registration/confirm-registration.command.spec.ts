import { ZodError } from "zod";
import { ConfirmRegistrationCommand } from "./confirm-registration.command";

it("throws with invalid confirmation token", () => {
  expect(() => {
    new ConfirmRegistrationCommand({
      confirmationToken: "invalid token",
    });
  }).toThrow(ZodError);
});

it("validates with valid confirmation token", () => {
  expect(() => {
    new ConfirmRegistrationCommand({
      confirmationToken: "c4e4d6b8-1f1b-4d2c-8a1f-4a6b4b1e9d1a",
    });
  }).not.toThrow();
});
