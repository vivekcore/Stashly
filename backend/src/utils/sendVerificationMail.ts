
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface IsendEmail {
  to: string;
  url?: string;
  subject: string;
  text?: string;
  tag?: "verify" | "forget" | "existinguser";
}

export async function sendEmail({ to, url, subject, text,tag }: IsendEmail) {
  if (tag === "verify") {
    await transporter.sendMail({
      from: 'Stashly',
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
  if(tag === 'forget'){
    await transporter.sendMail({
      from:"Stashly",
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

      `
    })
  }
  if (tag === "existinguser") {
    await transporter.sendMail({
      from: "Stashly",
      to,
      subject,
      text,
    });
  }
}
