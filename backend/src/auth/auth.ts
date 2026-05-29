import { type Auth, type BetterAuthOptions, betterAuth } from "better-auth";
import { Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { sendEmail } from "../utils/sendVerificationMail.js";
dotenv.config();

export let authInstance: Auth<BetterAuthOptions>;

export const getAuth = (): Auth<BetterAuthOptions> => {
  if (!authInstance) {
    const db = mongoose.connection.db as Db;
    if (!db) throw new Error("DB not connected yet. Call ConnectDB() first.");
    //const isProd = process.env.NODE_ENV === "production";

    authInstance = betterAuth<BetterAuthOptions>({
      database: mongodbAdapter(db, { usePlural: true }),
      secret: process.env.BETTER_AUTH_SECRET,
      baseURL: process.env.BACKEND_URL,
      basePath: "/api/v1/auth",

      emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        onExistingUserSignUp: async ({ user }, request) => {
          void sendEmail({
            to: user.email,
            subject: "Sign-up attempt with your email",
            text: "Someone tried to create an account using your email address. If this was you, try signing in instead.",
          });
        },
      },
      emailVerification: {
        sendOnSignUp: true, //Sends immediately after signup
        sendOnSignIn: true, //if unverified user tries to login
        sendVerificationEmail: async ({ user, url }) => {
          await sendEmail({
            to: user.email,
            url,
            subject: "Verify your email",
          });
        },
      },

      socialProviders: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          redirectURI: `${process.env.BACKEND_URL}/api/v1/auth/callback/github`,
        },
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          redirectURI: `${process.env.BACKEND_URL}/api/v1/auth/callback/google`,
        },
      },
      trustedOrigins: [
        process.env.FRONTEND_URL as string,
        process.env.BACKEND_URL as string,
      ],
      advanced: {
        defaultCookieAttributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        },
      },
      // account: {
      //   skipStateCookieCheck: false,
      // },
    });
  }
  return authInstance;
};
