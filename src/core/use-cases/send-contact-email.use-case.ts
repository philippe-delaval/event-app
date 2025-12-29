import { EmailSender } from "../lib/email-sender.lib";

interface SendContactEmailParams {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
}

export async function sendContactEmailUseCase(
  dependencies: { emailSender: EmailSender },
  params: SendContactEmailParams,
): Promise<void> {
  const { firstname, lastname, email, message } = params;

  await dependencies.emailSender.send({
    to: "contact@event-app.com", // Or a configured admin email
    subject: `Nouveau message de contact de ${firstname} ${lastname}`,
    html: `
      <h1>Nouveau message de contact</h1>
      <p><strong>Nom:</strong> ${firstname} ${lastname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });
}
