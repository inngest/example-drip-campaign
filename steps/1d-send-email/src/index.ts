import type { Args } from "./types";
import sgMail from "@sendgrid/mail";

export async function run({ event }: Args) {
  // Environment variables are easily set via the secrets manager:
  // https://www.inngest.com/docs/cloud/managing-secrets
  if (typeof process.env.SENDGRID_API_KEY === "undefined") {
    throw new Error("SENDGRID_API_KEY is not defined");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: event.user.email,
    from: "team@restaurant-awesome.com", // Change to your verified sender
    subject: "Booking reservations is easy w/ Restaurant Awesome",
    text: `Just goto restaurant-awesome.com and search for your favorite restaurant and click "book now"`,
  };

  // Send the email via SendGrid
  const response = await sgMail.send(msg);

  // We pass through the response status code from SendGrid
  // Anything returned here will be recorded in Inngest as the result of the step
  return { status: response[0].statusCode };
}
