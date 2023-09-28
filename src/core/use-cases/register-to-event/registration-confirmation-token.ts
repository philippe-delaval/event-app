import { v4 as uuidv4 } from "uuid";

export class RegistrationConfirmationToken {
  private readonly token: string;

  constructor() {
    this.token = this.generateToken();
  }

  toString(): string {
    return this.token;
  }

  private generateToken(): string {
    return uuidv4();
  }
}
