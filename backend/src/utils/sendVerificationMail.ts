import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ApiError from "./apiError.js";
dotenv.config();
export const transporter = nodemailer.createTransport({
  service:'gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.error('Resend SMTP Error:', err);
  else console.log(' Resend SMTP Ready');
});
interface IsendEmail {
  to: string;
  url?: string;
  subject: string;
  text?: string;
  tag?: "verify" | "forget" | "existinguser";
}

export async function sendEmail({ to, url, subject, text, tag }: IsendEmail) {
  try {
    if (tag === "verify") {
      await transporter.sendMail({
        from: `"Stashly"`,
        to,
        subject,
        html: `
      <h2>Email Verification</h2>
      <p>Click the button below to verify your email:</p>
      <a href="${url}"
         style="
           display:inline-block;
           padding:10px 20px;
           background:#2563eb;
           color:white;
           text-decoration:none;
           border-radius:6px;
         ">
         Verify Email
      </a>
    `,
      });
    }
    if (tag === "forget") {
      await transporter.sendMail({
        from: `"Stashly" `,
        to,
        subject,
        html: `
      <h2>Password Reset<h2>
      <p>click the button below to reset your password:</p>
      <a href="${url}"
         style="
           display:inline-block;
           padding:10px 20px;
           background:#2563eb;
           color:white;
           text-decoration:none;
           border-radius:6px;
         ">
         Reset password
      </a>

      `,
      });
    }
    if (tag === "existinguser") {
      await transporter.sendMail({
        from: `"Stashly"`,
        to,
        subject,
        text,
      });
    }
  } catch (error) {
    throw new ApiError(400, "Email delivery failed");
  }
}
