import { z } from "zod";

export interface RegistrationCommandDto {
  lastName: string;
  firstName: string;
  email: string;
  jobTitle?: string;
  company?: string;
  marketingConsent?: boolean;
}

const ATTENDEE_NAME_REGEX =
  /^[a-zA-ZàáâäãåąćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĻŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð .'-]+$/;

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export class RegistrationCommand {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly jobTitle?: string;
  public readonly company?: string;
  public readonly marketingConsent?: boolean;

  constructor(private commandDto: RegistrationCommandDto) {
    this.transformDto();
    this.validateDto();

    this.firstName = this.commandDto.firstName;
    this.lastName = this.commandDto.lastName;
    this.email = this.commandDto.email;
    this.jobTitle = this.commandDto.jobTitle;
    this.company = this.commandDto.company;
    this.marketingConsent = this.commandDto.marketingConsent;
  }

  private transformDto(): void {
    this.commandDto = z
      .object({
        firstName: z.string().trim(),
        lastName: z.string().trim(),
        email: z.string().trim(),
        jobTitle: z.string().trim().optional(),
        company: z.string().trim().optional(),
        marketingConsent: z.boolean().optional(),
      })
      .parse(this.commandDto);
  }

  private validateDto(): void {
    z.object({
      firstName: this.getAttendeeNameValidator(),
      lastName: this.getAttendeeNameValidator(),
      email: z.string().regex(EMAIL_REGEX),
      jobTitle: z.string().max(250).optional(),
      company: z.string().max(250).optional(),
      marketingConsent: z.boolean().optional(),
    }).parse(this.commandDto);
  }

  private getAttendeeNameValidator() {
    return z.string().min(2).max(250).regex(ATTENDEE_NAME_REGEX);
  }
}
