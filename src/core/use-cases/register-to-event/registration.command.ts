import { z } from "zod";

export interface RegistrationCommandDto {
  lastName: string;
  firstName: string;
  email: string;
}

const ATTENDEE_NAME_REGEX =
  /^[a-zA-ZàáâäãåąćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĻŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð .'-]+$/u;

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export class RegistrationCommand {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;

  constructor(private commandDto: RegistrationCommandDto) {
    this.transformDto();
    this.validateDto();

    this.firstName = this.commandDto.firstName;
    this.lastName = this.commandDto.lastName;
    this.email = this.commandDto.email;
  }

  private transformDto(): void {
    this.commandDto = z
      .object({
        firstName: z.string().trim(),
        lastName: z.string().trim(),
        email: z.string().trim(),
      })
      .parse(this.commandDto);
  }

  private validateDto(): void {
    this.commandDto = z
      .object({
        firstName: this.getAttendeeNameValidator(),
        lastName: this.getAttendeeNameValidator(),
        email: z.string().regex(EMAIL_REGEX),
      })
      .parse(this.commandDto);
  }

  private getAttendeeNameValidator() {
    return z.string().min(2).max(250).regex(ATTENDEE_NAME_REGEX);
  }
}
