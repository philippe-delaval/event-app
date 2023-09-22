import { z } from "zod";

export interface RegistrationCommandDto {
  lastName: string;
  firstName: string;
}

const ATTENDEE_NAME_REGEX =
  /^[a-zA-ZàáâäãåąćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĻŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð .'-]+$/u;

export class RegistrationCommand {
  public readonly firstName: string;
  public readonly lastName: string;

  constructor(private commandDto: RegistrationCommandDto) {
    this.transformDto();
    this.validateDto();

    this.firstName = this.commandDto.firstName;
    this.lastName = this.commandDto.lastName;
  }

  private transformDto(): void {
    this.commandDto = z
      .object({
        firstName: z.string().trim(),
        lastName: z.string().trim(),
      })
      .parse(this.commandDto);
  }

  private validateDto(): void {
    this.commandDto = z
      .object({
        firstName: this.getAttendeeNameValidator(),
        lastName: this.getAttendeeNameValidator(),
      })
      .parse(this.commandDto);
  }

  private getAttendeeNameValidator() {
    return z.string().min(2).max(250).regex(ATTENDEE_NAME_REGEX);
  }
}
