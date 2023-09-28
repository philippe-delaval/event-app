import bcrypt from "bcrypt";

export class AttendeeEmailConfirmationHash {
  private readonly hash: string;

  constructor(attendeeEmail: string) {
    this.hash = this.generateHash(attendeeEmail);
  }

  getHash(): string {
    return this.hash;
  }

  private generateHash(attendeeEmail: string): string {
    return bcrypt.hashSync(attendeeEmail, 10);
  }
}
