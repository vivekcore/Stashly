import mongoose from "mongoose";
import { Types } from "mongoose";
export const contentTypes = ["image", "video", "article", "audio"];

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

const Tags = new mongoose.Schema({
  title: { type: String, required: true },
});

const Content = new mongoose.Schema({
  link: { type: String, required: true },
  linkType: {type:String},
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  description: {type: String},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
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
const tagsModel = mongoose.model("Tags", Tags);

export default { userModel, contentModel, linksModel, tagsModel };
