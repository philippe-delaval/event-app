import { RegistrationConfirmationToken } from "./registration-confirmation-token";

it("generates a token with a length of 36", () => {
  const token = new RegistrationConfirmationToken();

  expect(token.toString()).toHaveLength(36);
});

it("generates a token that is different from another attendee email token", () => {
  const token = new RegistrationConfirmationToken();
  const anotherToken = new RegistrationConfirmationToken();

  expect(token.toString()).not.toBe(anotherToken.toString());
});
