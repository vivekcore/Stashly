import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ApiError from "./apiError.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

transporter.verify((err) => {
  if (err) {
    console.error("Gmail SMTP Connection Error:", err.message);
  } else {
    console.log("Gmail SMTP Connected Successfully");
  }
});

interface IsendEmail {
  to: string;
  url?: string;
  subject: string;
  text?: string;
  tag?: "verify" | "forget" | "existinguser";
}

export async function sendEmail({ to, url, subject, text, tag }: IsendEmail) {
  const emailUser = process.env.EMAIL_USER;
  
  try {
    let htmlContent = "";
    
    if (tag === "verify") {
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e293b;">Email Verification</h2>
          <p style="color: #475569;">Click the button below to verify your email address:</p>
          <a href="${url}"
             style="
               display: inline-block;
               padding: 12px 24px;
               background-color: #2563eb;
               color: #ffffff;
               text-decoration: none;
               border-radius: 6px;
               font-weight: 600;
             ">
             Verify Email
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `;
    } else if (tag === "forget") {
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e293b;">Password Reset</h2>
          <p style="color: #475569;">Click the button below to reset your password:</p>
          <a href="${url}"
             style="
               display: inline-block;
               padding: 12px 24px;
               background-color: #2563eb;
               color: #ffffff;
               text-decoration: none;
               border-radius: 6px;
               font-weight: 600;
             ">
             Reset Password
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
            If you didn't request this password reset, please ignore this email.
          </p>
        </div>
      `;
    }

    const mailOptions = {
      from: `"Stashly" <${emailUser}>`,
      to,
      subject,
      text: text || subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;

  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new ApiError(500, "Email delivery failed. Please try again later.");
  }
}
