import { connect } from "mongoose";
import { Types } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export async function ConnectDB() {
  try {
    await connect(process.env.DATABASE_URL as string, {
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
