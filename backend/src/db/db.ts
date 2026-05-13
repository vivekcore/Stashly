import mongoose, { connect } from "mongoose";
import { Types } from "mongoose";
import getConfig from "../utils/config.js";
export const contentTypes = ["image", "video", "article", "audio"];

const env = getConfig();

export async function ConnectDB() {
  try {
    await connect(env.DATABASE_URL, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}
