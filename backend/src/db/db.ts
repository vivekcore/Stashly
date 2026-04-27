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

const User = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 20,
  },
  password: { type: String, required: true, minLength: 8 },
  email: { type: String, required: true, unique: true },
});

const Content = new mongoose.Schema({
  link: { type: String, required: true },
  linkType: { type: String },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Link = new mongoose.Schema({
  hash: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const userModel = mongoose.model("User", User);
const contentModel = mongoose.model("Content", Content);
const linksModel = mongoose.model("Link", Link);

export default { userModel, contentModel, linksModel };
