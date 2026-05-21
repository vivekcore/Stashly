import { type Auth, type BetterAuthOptions, betterAuth } from "better-auth";
import { Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export let authInstance: Auth<BetterAuthOptions>;

export const getAuth = (): Auth<BetterAuthOptions> => {
  if (!authInstance) {
    const db = mongoose.connection.db as Db;
    if (!db) throw new Error("DB not connected yet. Call ConnectDB() first.");

    const backendUrl = process.env.BACKEND_URL as string;
    
    console.log("Initializing Better Auth with baseURL:", backendUrl);

    authInstance = betterAuth<BetterAuthOptions>({
      database: mongodbAdapter(db,{usePlural:true}),
      secret: process.env.BETTER_AUTH_SECRET,
      baseURL: backendUrl,
      basePath: "/api/v1/auth",

      socialProviders: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
      },
      trustedOrigins:[process.env.FRONTEND_URL as string],
    });
  }
  return authInstance;
};
