import dotenv from "dotenv";
import ApiError from "./apiError.js";

dotenv.config();


export async function sendEmail({ to, url, subject, text, tag }: { to: string; url?: string; subject: string; text?: string; tag?: string }) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const SENDER_EMAIL = process.env.EMAIL_USER; 

  if (!BREVO_API_KEY) {
    console.error("Missing BREVO_API_KEY");
    throw new ApiError(500, "Email configuration error");
  }

  try {
    let htmlContent = "";

    if (tag === "verify") {
      htmlContent = `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Verify your email</h2>
          <p>Click the button below to verify your Stashly account:</p>
          <a href="${url}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </div>
      `;
    } else if (tag === "forget") {
      htmlContent = `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Reset Password</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${url}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </div>
      `;
    } else {
      htmlContent = `<p>${text || subject}</p>`;
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Stashly", email: SENDER_EMAIL },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new ApiError(500, "Email delivery failed via Brevo");
    }
    return result;

  } catch (error) {
    throw new ApiError(500, "Email delivery failed. Please try again later.");
  }
}
