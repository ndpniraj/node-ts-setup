// Looking to send emails in production? Check out our Email API/SMTP product!
import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN;

if (!TOKEN) throw new Error(".env error: { MAILTRAP_TOKEN } is missing!");

const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 1307407,
});

export const sendVerificationMail = (email: string, otp: string) => {
  const sender = {
    email: "auth@expobus.com",
    name: "Expo Bus",
  };
  const recipients = [{ email }];

  client.testing
    .send({
      from: sender,
      to: recipients,
      subject: "Welcome Email",
      text: `Welcome to Expo Bus. Use the following code to verify your email. Verification code: ${otp}`,
      category: "Auth Verification",
    })
    .then(console.log, console.error);
};
