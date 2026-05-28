// sendVerificationMail.js

// mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({to, url}:{to:string,url:string}) {


  await transporter.sendMail({
    from: '"My App" <yourgmail@gmail.com>',
    to,
    subject: "Verify your email",
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