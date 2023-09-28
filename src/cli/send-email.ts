/**
 * This is a script for testing the email sender. It is not used in the application.
 * Example of use:
 * $ SMTP_HOST=smtp.mydomain.com SMTP_PORT=587 SMTP_SECURE=false \
 *   SMTP_USER=me@domain.com SMTP_PASS=mypassword \
 *   npx ts-node --skipProject src/cli/send-email.ts \
 *   me@domain.com recipient@otherdomain.com "Subject" "My body"
 */

import { EmailSender } from "../core/lib/email-sender.lib";

async function sendMail() {
  const sender = new EmailSender();

  if (process.argv.length < 5) {
    throw new Error(`
			Missing arguments
			Usage: SMTP_HOST=smtp.mydomain.com SMTP_PORT=587 SMTP_SECURE=false \
						 SMTP_USER=me@domain.com SMTP_PASS=mypassword \
						 npx ts-node --skipProject src/cli/send-email.ts \
						 recipient@otherdomain.com "Subject" "My body"
		`);
  }

  await sender.send({
    to: process.argv[2],
    subject: process.argv[3],
    html: process.argv[4],
  });
}

sendMail()
  .then(() => {
    console.log("Mail sent");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
