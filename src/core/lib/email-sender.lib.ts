import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { getEnvVariable } from "./env.lib";

export class EmailSender {
  private readonly transporterConfig: SMTPTransport.Options;
  private readonly transporter: Transporter;

  constructor() {
    this.transporterConfig = this.getTransporterConfig();
    this.transporter = createTransport(this.transporterConfig);
  }

  async send(params: { to: string; subject: string; html: string }) {
    return this.transporter.sendMail({
      from: this.transporterConfig.auth!.user,
      ...params,
      html: params.html,
    });
  }

  private getTransporterConfig(): SMTPTransport.Options {
    return {
      host: getEnvVariable("SMTP_HOST"),
      port: parseInt(getEnvVariable("SMTP_PORT")),
      secure: getEnvVariable("SMTP_SECURE") === "true",
      auth: {
        user: getEnvVariable("SMTP_USER"),
        pass: getEnvVariable("SMTP_PASS"),
      },
    };
  }
}
