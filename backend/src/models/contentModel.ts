import mongoose, {  Schema, model, Document } from "mongoose";
import "./userModel.js";

export enum ContentFilter {
  IMAGE = "image",
  VIDEO = "video",
  ARTICLE = "article",
  AUDIO = "audio",
}
export enum websiteTypes {
  YOUTUBE = "youtube",
  LINKEDIN = "linkedin",
  TWITTER = "twitter",
  OTHER = "other",
}
export interface Icontent extends Document {
  link: string;
  website: websiteTypes;
  slug: string;
  type: ContentFilter;
  title: string;
  description: string;
  tags: string[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date,
  updatedAt: Date,
}
const ContentSchema = new Schema<Icontent>({
  link: { type: String, required: true },
  website: {
    type: String,
    enum: Object.values(websiteTypes),
    default: websiteTypes.OTHER,
    required: true,
  },
  slug: { type: String },
  type: {
    type: String,
    enum: Object.values(ContentFilter),
    required: true,
    default: ContentFilter.ARTICLE,
  },
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
},
{
  timestamps:true
}
);
ContentSchema.index({userId: 1, createdAt: -1});
ContentSchema.index({createdAt: -1});
ContentSchema.index({title: 'text', description: 'text'})
export const contentModel = model<Icontent>("contents", ContentSchema);
