import mongoose from "mongoose";
import { Types } from "mongoose";

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

export const userModel = mongoose.model("users", User);
