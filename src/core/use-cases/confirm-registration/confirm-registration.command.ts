import { z } from "zod";

export interface ConfirmRegistrationCommandDto {
  confirmationToken: string;
}

export class ConfirmRegistrationCommand {
  public readonly confirmationToken: string;

  constructor(private readonly commandDto: ConfirmRegistrationCommandDto) {
    this.validateDto();

    this.confirmationToken = commandDto.confirmationToken;
  }

  private validateDto(): void {
    z.object({
      confirmationToken: z.string().uuid(),
    }).parse(this.commandDto);
  }
}
