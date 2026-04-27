import { InferSchemaType,Schema,model } from "mongoose";
import { Types } from "mongoose";
export const contentTypes = ["image", "video", "article", "audio"];


const ContentSchema = new Schema({
  link: { type: String, required: true },
  linkType: { type: String },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});
type ContentDocument = InferSchemaType<typeof ContentSchema>;
export const contentModel = model<ContentDocument>("contents",ContentSchema)